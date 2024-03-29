import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProblemDetailService } from '../problem-detail.service';
import exportFromJSON from 'export-from-json';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AudioRecordingService } from '../services/audio-recording.service';
import { ActivatedRoute } from '@angular/router';
import { PatientEncounterDetail } from '../interface/patientEncounterDetail';


interface JSON{
  updatedjson:string;
}

interface Tab {
  title: string;
}

@Component({
  selector: 'app-problemdetail',
  templateUrl: './problemdetail.component.html',
  providers:[ProblemDetailService],
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  styleUrl: './problemdetail.component.scss'
})
export class ProblemdetailComponent implements OnInit {
  data:any = [{ foo: 'foo'}, { bar: 'bar' }];
fileName : string = 'download';
exportType =  exportFromJSON.types.json;
receivedData: any;
advisory:any;
newSummary:any;
summary:any;
patient : PatientEncounterDetail={
    PartitionKey:"",
      RowKey:"",
      Timestamp: new Date,
      ETag: "",
      RecordingBlobPath: "",
      ConsultationStartDateTime: new Date,
      ConsultationEndDateTime:new Date,
      OriginalJson: "",
      UpdatedJson: ""
};


ngOnInit(): void {
  
}

  constructor(private route: ActivatedRoute, private dataService : ProblemDetailService,private audioRecordingService: AudioRecordingService){
   this.receivedData = this.audioRecordingService.getJsonData();
   
   this.advisory=this.receivedData["advisory"];
   this.summary=this.receivedData["summary"];
   this.newSummary=this.receivedData["new_summary"];
   this.selectedTab = "Soap Notes"; 
   this.saveJson();
  }
  
saveJson(){  
  this.patient.OriginalJson = JSON.stringify(this.receivedData);
  this.dataService.saveData(this.patient).subscribe(
    (items: any) => {
      this.patient.RowKey=items.rowKey;
      this.patient.PartitionKey=items.partitionKey;
    },
    error => {
      console.log('Error fetching data:', error);
    }
  );
}

  tabs = [
    { title: 'Detailed Report' },
    { title: 'Soap Notes' },
    { title: 'Clinical Notes' }
  ];
  selectedTab: any;

  selectTab(tab:any) {
    this.selectedTab = tab.title;
  }
  submit(){
    this.patient.UpdatedJson = JSON.stringify(this.receivedData);
    this.dataService.updateData(this.patient).subscribe(
      (items: any) => {
      },
      error => {
        console.log('Error fetching data:', error);
      }
    );
  }
  exportJSON(){
  exportFromJSON({
    data: this.receivedData,
    fileName: 'data_export',
    exportType: 'json' // or 'json' or 'xls'
  });
}

generatePDF(element: HTMLElement) {
  const htmlContent = element.innerHTML;
  const doc = new jsPDF();
  doc.html(htmlContent, {
    callback: (pdf) => {
      pdf.save('generated.pdf');
    }
  });
}
}


// // Prepare JSON data as HTML table
// let htmlContent = '<table>';
// for (const key in this.response) {
//   if (this.response.hasOwnProperty(key)) {
//     const values = this.response[key];
//     htmlContent += '<tr>';
//     Object.values(values).forEach((value) => {
//       htmlContent += `<td>${value}</td>`;
//     });
//     htmlContent += '</tr>';
//   }    
// }
// // htmlContent += '</table>';
// // this.response.forEach((item:any) => {
// //   htmlContent += '<tr>';
// //   Object.values(item).forEach((value) => {
// //     htmlContent += `<td>${value}</td>`;
// //   });
// //   htmlContent += '</tr>';
// // });
// // htmlContent += '</table>';

// // Convert HTML content to canvas

// htmlContent+=htmlContent+'</table>';
// console.log(htmlContent);
// html2canvas(document.getElementById('pdfContent')!).then((canvas) => {
//   console.log(canvas);
//   const imgData = canvas.toDataURL('image/png');
//   const pdf = new jsPDF('p', 'mm', 'a4');
//   const imgWidth = 210; // A4 width in mm
//   const imgHeight = (canvas.height * imgWidth) / canvas.width;
//   pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
 
//   pdf.save('generated.pdf');
// });
