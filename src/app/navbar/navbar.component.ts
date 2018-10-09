import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  options: Array<String>;

  constructor() { }

  ngOnInit() {
    this.options = new Array();
    this.options.push('Profil');
    this.options.push('Statisztika');
  }

}
