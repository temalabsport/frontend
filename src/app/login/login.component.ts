import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    './loginres/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    './loginres/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    './loginres/vendor/animate/animate.css',
    './loginres/vendor/css-hamburgers/hamburgers.min.css',
    './loginres/vendor/select2/select2.min.css',
    './loginres/css/util.css',
    './loginres/css/main.css'
  ]
})
export class LoginComponent implements OnInit {
  faUser = faUser;

  constructor() {}

  ngOnInit() {}
}
