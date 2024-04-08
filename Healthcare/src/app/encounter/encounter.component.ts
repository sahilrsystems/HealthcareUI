import { Component } from '@angular/core';
import { HeaderComponent } from '../common/component/header/header.component';
import { NewEncounterComponent } from './new-encounter/new-encounter.component';
import { SaveEncounterComponent } from './save-encounter/save-encounter.component';

@Component({
  selector: 'app-encounter',
  standalone: true,
  imports: [HeaderComponent,NewEncounterComponent,SaveEncounterComponent],
  templateUrl: './encounter.component.html',
  styleUrl: './encounter.component.scss'
})
export class EncounterComponent {

}
