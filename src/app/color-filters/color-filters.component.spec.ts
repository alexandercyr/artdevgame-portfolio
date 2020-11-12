import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFiltersComponent } from './color-filters.component';

describe('ColorFiltersComponent', () => {
  let component: ColorFiltersComponent;
  let fixture: ComponentFixture<ColorFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
