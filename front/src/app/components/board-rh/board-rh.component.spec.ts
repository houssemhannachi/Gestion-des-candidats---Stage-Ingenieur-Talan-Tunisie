import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardRhComponent} from './board-rh.component';

describe('BoardRhComponent', () => {
  let component: BoardRhComponent;
  let fixture: ComponentFixture<BoardRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardRhComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BoardRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
