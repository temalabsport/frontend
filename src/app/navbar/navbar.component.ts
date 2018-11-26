import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options: Array<String>;
  currentUser = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(
        localStorage.getItem('currentUser')
      ).body.userName;
    }
    this.options = new Array();
    this.options.push('Profil');
    this.options.push('Statisztika');
  }

  logout() {
    this.authService.logout();
  }

}
