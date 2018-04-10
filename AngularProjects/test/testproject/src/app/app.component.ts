import { Component } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  user = new User();
  users = [];
  onSubmit({value,valid}){
    this.users.push(this.user);
    this.user = new User();
    console.log('Value', value)
    console.log('Valid',valid)
  }
  
}
