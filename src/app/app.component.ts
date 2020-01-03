import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'XMLParser';
  public selectedVal: string;
  constructor() { }

  ngOnInit() {
    this.selectedVal ='upload';
  } 

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log(val);
  }
}
