import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDossierComponent } from './update-dossier.component';

describe('UpdateDossierComponent', () => {
  let component: UpdateDossierComponent;
  let fixture: ComponentFixture<UpdateDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDossierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
