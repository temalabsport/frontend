import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  players: Array<User>;

  constructor() { }

  ngOnInit() {
    this.players = new Array();
    const user = new User('a', 'b', 'c');
    for (let i = 0; i < 10 ;  ++i) {
      this.players.push(new User('Bela' + i * 10, 'bela' + i * 11 + '@gmail.com', 'Bela' + i));
    }

  }

}
