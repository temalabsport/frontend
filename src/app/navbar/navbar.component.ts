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
    this.options.push('alma');
    this.options.push('korte');
    this.options.push('barack');
    this.options.push('lo');
  }

}
