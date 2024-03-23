import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProblemDetailService } from '../problem-detail.service';
import { HttpClientModule } from '@angular/common/http';


interface Tab {
  title: string;
}

@Component({
  selector: 'app-problemdetail',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './problemdetail.component.html',
  styleUrl: './problemdetail.component.scss'
})
export class ProblemdetailComponent {

  constructor(){}

  response :any={
    "summary": {
        "Assessment": "- Suspected viral fever with associated body aches and gastrointestinal discomfort.\n- Mild dehydration likely due to insufficient fluid intake.",
        "CPT Codes": [
            "Consultation Duration: 99203"
        ],
        "ICD Codes": [
            "- PRIMARY:-",
            "- R50.9: Fever, unspecified.",
            "-",
            "- SUGGESTIVE:-",
            "- R53.83: Other fatigue.",
            "- R63.0: Anorexia.",
            "- R11.0: Nausea.",
            "- Z71.89: Other specified counseling, not elsewhere classified (pertaining to the recommendation for primary care and routine health maintenance).",
            "ROS:",
            "- No additional information from ROS can be factored into the Assessment as there is no mention of eye symptoms in the main text."
        ],
        "Objective": "- Physical examination reveals normal vital signs and no temperature.\n- HEENT (head, eyes, ears, nose, throat) exam is negative.\n- Heart and lung exams show no abnormalities.\n- Abdominal exam is negative with normal bowel sounds, no pain, discomfort, guarding, or rigidity.\n- The skin appears normal, not indicative of dehydration.",
        "Plan": "- Encourage increased fluid intake, aiming for at least 6 to 8 glasses per day, plus an extra glass to account for fever-induced dehydration.\n- Advised to consume soft foods and sugary foods for energy, avoiding greasy foods.\n- Recommended to continue taking Tylenol every 4 to 6 hours for fever management.\n- No blood tests suggested at this stage due to the presumed simplicity of the viral infection.\n- Follow-up communication through the patient portal encouraged, and a suggestion to establish regular primary care for routine health maintenance.",
        "Subjective": "- The patient reports a fever for the last two days with fluctuating temperatures between 99 to 101 degrees Fahrenheit.\n- Body aches are present; experiences nausea when lying down and a sensation of stomach bloating.\n- The patient has a decreased appetite and reduced food intake but has been consuming fluids, specifically around 2 to 3 ounces of lemonade.\n- Sleep patterns may be affected due to the illness, although not explicitly stated.\n- No recent travel or known contact with sick individuals."
    }
};
  tabs = [
    { title: 'Detailed Report' },
    { title: 'Soap Notes' },
    { title: 'Clinical Notes' }
  ];
  selectedTab: any;

  selectTab(tab:any) {
    this.selectedTab = tab.title;
    console.log(this.selectedTab);
  }
  submit(){
    //this.dataService.saveData(this.response.summary);
    alert(this.response.summary);

  }
}
