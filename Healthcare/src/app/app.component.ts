import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './common/component/header/header.component';
import { SideNavComponent } from './common/component/side-nav/side-nav.component';
import { RecordingComponent } from './component/recording/recording.component';
import { ProblemdetailComponent } from './problemdetail/problemdetail.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.services';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,SideNavComponent,RecordingComponent,HttpClientModule,ModalModule,ProblemdetailComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[HttpService,BsModalService]
})
export class AppComponent {
  title = 'DemoUi';
}
