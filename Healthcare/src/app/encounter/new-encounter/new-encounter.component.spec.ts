import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEncounterComponent } from './new-encounter.component';

describe('NewEncounterComponent', () => {
  let component: NewEncounterComponent;
  let fixture: ComponentFixture<NewEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEncounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
