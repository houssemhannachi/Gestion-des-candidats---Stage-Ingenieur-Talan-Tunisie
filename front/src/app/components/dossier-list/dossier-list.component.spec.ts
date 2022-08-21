import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierListComponent } from './dossier-list.component';

describe('DossierListComponent', () => {
  let component: DossierListComponent;
  let fixture: ComponentFixture<DossierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
