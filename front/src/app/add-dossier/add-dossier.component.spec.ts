import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierComponent } from './add-dossier.component';

describe('AddDossierComponent', () => {
  let component: AddDossierComponent;
  let fixture: ComponentFixture<AddDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
