import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntretienComponent } from './entretien.component';

describe('EntretienComponent', () => {
  let component: EntretienComponent;
  let fixture: ComponentFixture<EntretienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntretienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntretienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
