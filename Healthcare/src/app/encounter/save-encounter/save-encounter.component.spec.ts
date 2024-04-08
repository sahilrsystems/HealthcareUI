import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEncounterComponent } from './save-encounter.component';

describe('SaveEncounterComponent', () => {
  let component: SaveEncounterComponent;
  let fixture: ComponentFixture<SaveEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveEncounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaveEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
