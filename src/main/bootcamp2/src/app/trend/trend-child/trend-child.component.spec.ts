import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendChildComponent } from './trend-child.component';

describe('TrendChildComponent', () => {
  let component: TrendChildComponent;
  let fixture: ComponentFixture<TrendChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
