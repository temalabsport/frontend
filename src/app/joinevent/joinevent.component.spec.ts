import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoineventComponent } from './joinevent.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaterialModule } from '../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('JoineventComponent', () => {
  let component: JoineventComponent;
  let fixture: ComponentFixture<JoineventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoineventComponent, NavbarComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoineventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
