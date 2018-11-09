import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineventComponent } from './joinevent.component';

describe('JoineventComponent', () => {
  let component: JoineventComponent;
  let fixture: ComponentFixture<JoineventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoineventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
