import { Component } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = new User();
  users = [];
  submitted:boolean = false;
  onSubmit(formData){
    this.user = formData;
    this.submitted = true;
    this.users.unshift(this.user);
    this.user = new User();
  }
}
