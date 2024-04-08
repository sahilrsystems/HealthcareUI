import { Routes } from '@angular/router';
import { RecordingComponent } from './component/recording/recording.component';
import { ProblemdetailComponent } from './problemdetail/problemdetail.component';
import { EncounterComponent } from './encounter/encounter.component';

export const routes: Routes = [
    {
        path:'recording',
        component:RecordingComponent
    },
    {
        path:'',
        component:RecordingComponent
    },
    {
        path   :'problemDetail',
        component:ProblemdetailComponent
    },
    {
        path   :'encounter',
        component:EncounterComponent
    }
];
