import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorOptionsComponent } from './color-options.component';

describe('ColorOptionsComponent', () => {
  let component: ColorOptionsComponent;
  let fixture: ComponentFixture<ColorOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
