import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/component/header/header.component';
import { SideNavComponent } from './common/component/side-nav/side-nav.component';
import { RecordingComponent } from './component/recording/recording.component';
import { ProblemdetailComponent } from './problemdetail/problemdetail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,SideNavComponent,RecordingComponent,ProblemdetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'DemoUi';
}
