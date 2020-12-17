import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureTextComponent } from './feature-text.component';

describe('FeatureTextComponent', () => {
  let component: FeatureTextComponent;
  let fixture: ComponentFixture<FeatureTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
