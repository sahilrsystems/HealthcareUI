import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AudioRecordingService } from '../../services/audio-recording.service';
import { Router } from 'express';
import { HttpService } from '../../services/http.services';

@Component({
  selector: 'app-new-encounter',
  standalone: true,
  imports: [],
  templateUrl: './new-encounter.component.html',
  styleUrl: './new-encounter.component.scss'
})
export class NewEncounterComponent {

  audioURL: string | null = null;
  isRecording: boolean = false;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private audioRecordingService: AudioRecordingService, private cd: ChangeDetectorRef,
    private http: HttpService, private router: Router, private ngZone: NgZone) {

  }

  ngOnInit() {
    this.audioRecordingService.audioBlob$.subscribe(blob => {
      this.audioURL = window.URL.createObjectURL(blob);
      this.audioPlayer.nativeElement.src = this.audioURL;
      this.cd.detectChanges();
    });
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
    this.startTime = new Date().toISOString();
    this.audioRecordingService.startRecording();
  }

}
