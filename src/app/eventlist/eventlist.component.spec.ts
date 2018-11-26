import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlistComponent } from './eventlist.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Event } from '../models/event';

describe('EventlistComponent', () => {
  let component: EventlistComponent;
  let fixture: ComponentFixture<EventlistComponent>;
  let eventRow: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventlistComponent, NavbarComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
