import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //dtOptions: Promise<DataTables.Settings>;    kikommentezett http-s megoldáshoz

  dtOptions: DataTables.Settings = {};
  events: Event[] = [];
  dtTrigger: Subject = new Subject();

  constructor(@Inject(Http) private http: Http) { }

  ngOnInit(): void {
    /*this.dtOptions = this.http.get('data/dtOptions.json')
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);*/

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2
      };
      this.http.get('data/data.json')
        .map(this.extractData)
        .subscribe(persons => {
          this.persons = persons;
          // Calling the DT trigger to manually render the table
          this.dtTrigger.next();
        });

      this.dtOptions = {
        ajax: 'data/data.json',
        columns: [{
          title: 'ID',
          data: 'id'
        }, {
          title: 'First name',
          data: 'firstName'
        }, {
          title: 'Last name',
          data: 'lastName'
        }]
      };
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
