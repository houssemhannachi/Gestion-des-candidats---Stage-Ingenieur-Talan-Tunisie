import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatListComponent } from './candidat-list.component';

describe('CandidatListComponent', () => {
  let component: CandidatListComponent;
  let fixture: ComponentFixture<CandidatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
