import { ChangeDetectorRef, Component, ElementRef, NgZone, TemplateRef, ViewChild, viewChildren } from '@angular/core';
import { AudioRecordingService } from '../../services/audio-recording.service';
import { HttpService } from '../../services/http.services';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';

declare var webkitSpeechRecognition: any
declare var window: Window & typeof globalThis;
@Component({
    selector: 'app-recording',
    standalone: true,
    imports: [CommonModule, ModalModule],
    templateUrl: './recording.component.html',
    styleUrl: './recording.component.scss'
})

export class RecordingComponent {
    recordingStatus: boolean = false;
    isRecording = false;
    audioURL: string | null = null;
    jsonStr: any = "";
    start!: any;
    startTime!:any
    end!: any;
    fileToUpload!: any;
    isLoading: boolean = false;
    audioSrc!: any
    response: any;
    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
    @ViewChild('player') player!: ElementRef<HTMLAudioElement>;

    constructor(private audioRecordingService: AudioRecordingService, private cd: ChangeDetectorRef,
        private http: HttpService, private router: Router, private ngZone: NgZone) {

    }

    ngOnInit() {
        this.audioRecordingService.audioBlob$.subscribe(blob => {
            this.audioURL = window.URL.createObjectURL(blob);
            this.audioPlayer.nativeElement.src = this.audioURL;
            this.audioSrc = this.audioPlayer;
            this.cd.detectChanges();
        });
    }

    handleFileInput(event: any) {
        let duration = 0;
        this.fileToUpload = event.target.files[0];
        this.onUploadBlob(this.fileToUpload, duration,new Date().toISOString(),new Date().toISOString());
    }

    startStopRecording() {
        if (this.recordingStatus) {
            //stopRecording();
        } else {
            var startRec = false;
            console.log("inside else");
            var txt =
                "Hello " +
                //"patientName" +
                ". Our bot will be taking notes during this session to help us make sure we don’t miss any important details for the documentation purpose. If you wish not to record this session, please inform the doctor now. ";
            var utterance = new SpeechSynthesisUtterance(txt);
            window.speechSynthesis.cancel();
            (<any>window).speechSynthesis.speak(utterance);
            var transcript;
            let recognization = new webkitSpeechRecognition();
            // recognization.interimResults = true;
            // recognization.continuous = true;
            recognization.lang = "en-US";
            recognization.onstart = (e: any) => {
                console.log("started recording.....");
            };
            recognization.onstop = (e: any) => {
                console.log("stopped recording.....");
            };
            recognization.onresult = (e: any) => {
                console.log(e.results);
                var transcript = e.results[0][0].transcript;
                let consent;
                console.log("transcript == > ", transcript);
                //if(transcript.includes("no")){
                if (
                    transcript.includes("no") ||
                    transcript.includes("not") ||
                    transcript.includes("don't") ||
                    transcript.includes("deny") ||
                    transcript.includes("refrain") ||
                    transcript.includes("stop")
                ) {
                    consent = new SpeechSynthesisUtterance(
                        "Okay " +
                        //"patientName" +
                        ", this encounter will not be recorded.",
                    );
                } else {
                    startRec = true;
                    consent = new SpeechSynthesisUtterance(
                        "Thanks " +
                        //"patientName" +
                        " for your consent, this encounter will now be recorded.",
                    );
                }
                window.speechSynthesis.speak(consent);
            };
            setTimeout(() => {
                recognization.start();
            }, 13700);
            setTimeout(() => {
                if (startRec) {
                    this.startRecording();
                } else {
                    let consent = new SpeechSynthesisUtterance("as we couldn't record your consent, this encounter will not be recorded.");
                    window.speechSynthesis.speak(consent);
                    //next();
                }
            }, 21500);
        }
    }




    startRecording() {
        this.isRecording = true;
        this.start = Date.now();
        this.startTime= new Date().toISOString();
        this.audioRecordingService.startRecording();
    }

    stopRecording() {
        this.isRecording = false;
        this.audioRecordingService.stopRecording();
        let audioLength = Date.now() - this.start;
        audioLength = audioLength / 1000;
        console.log(this.start);
        console.log("audioLength = ", audioLength);

        this.audioRecordingService.audioBlob$.subscribe(blob => {
            this.onUploadBlob(blob, audioLength,this.startTime,new Date().toISOString());
        });
    }

    onUploadBlob(blob: Blob, audioLength: number,startTime:any,endTime:any) {
        this.isLoading = true;
        const formblob = new FormData();
        formblob.append("files", blob)
        this.http.post(environment.UploadBlob, formblob).subscribe((result: any) => {
            console.log("blob Result", result);
            const tableData = {
                partitionKey: "20b65520-5337-4f0d-a047-7a70f579082f",
                rowKey:result.fileName,
                recordingBlobPath: "https://rsiehrstorage.blob.core.windows.net/ehraudio/" + result.fileName + ".wav",
                eTag: result.response.value.eTag,
                encounterType:"General",
                patientContext:"Test User",
                consultationStartDateTime:startTime,
                consultationEndDateTime:endTime
            }
            this.onSubmitPatientEncounter(blob, tableData, audioLength);
        });
    }
    onSubmitPatientEncounter(blob: Blob, value: any, audioLength: number) {
        this.http.post(environment.AddPatientEncounter, value).subscribe((result: any) => {
            console.log("table Result", result);
            this.onMLCall(blob, audioLength);
        });
    }

    onMLCall(blob: Blob, audioLength: number) {
        const formData = new FormData();
        formData.append("audiofile", blob);
        if (!this.jsonStr) {
            this.jsonStr = '{"Type":"General","Reported_Issues":""}';
        }
        this.jsonStr = { ...JSON.parse(this.jsonStr), audio_length: audioLength };
        console.log("ros JSON = ", this.jsonStr);
        const blobFile = new Blob([JSON.stringify(this.jsonStr)], {
            type: "application/json;charset=utf-8",
        });
        console.log("calling api now...............");
        formData.append("jsonfile", blobFile);
        this.http.postML(environment.MLSummary, formData).subscribe((result) => {
            this.audioRecordingService.setEHRChange(result);
            this.response = result;
            this.isLoading = false;
            this.setAudioURL(blob);
        });
    }

    Next() {
        console.log(this.response);
        this.ngZone.run(() => this.router.navigate(['/problemDetail']))
    }

    setAudioURL(blob: Blob) {
        this.audioURL = window.URL.createObjectURL(blob);
        this.audioSrc = this.audioURL;
        this.cd.detectChanges();
    }

}
