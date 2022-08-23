import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DossierCandidatureListComponent} from './dossier-candidature-list.component';

describe('DossierCandidatureListComponent', () => {
  let component: DossierCandidatureListComponent;
  let fixture: ComponentFixture<DossierCandidatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierCandidatureListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DossierCandidatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
