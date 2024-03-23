import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemdetailComponent } from './problemdetail.component';

describe('ProblemdetailComponent', () => {
  let component: ProblemdetailComponent;
  let fixture: ComponentFixture<ProblemdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProblemdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
