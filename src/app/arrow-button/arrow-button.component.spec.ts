import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowButtonComponent } from './arrow-button.component';

describe('ArrowButtonComponent', () => {
  let component: ArrowButtonComponent;
  let fixture: ComponentFixture<ArrowButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrowButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
