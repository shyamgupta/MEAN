import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'US Time Zone Display';
  currentTime:string;
  showTime(data): string{
    if(data === "PST"){
      this.currentTime = new Date().toLocaleString("en-US",{timeZone: "America/Los_Angeles"});
    }
    else if(data === "MST"){
      this.currentTime = new Date().toLocaleString("en-US",{timeZone: "America/Denver"});
    }
    else if(data === "EST"){
      this.currentTime = new Date().toLocaleString("en-US",{timeZone: "America/New_York"});
    }
    else if(data === 'CST'){
      this.currentTime = new Date().toLocaleString("en-US",{timeZone: "America/Chicago"});
    }
    else if(data === 'Clear'){
      console.log(data);
      this.currentTime === "";
    }
    return this.currentTime;
  }
}
