import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVideoComponent } from './grid-video.component';

describe('GridVideoComponent', () => {
  let component: GridVideoComponent;
  let fixture: ComponentFixture<GridVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridVideoComponent]
    });
    fixture = TestBed.createComponent(GridVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
