import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

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
    this.selectedVal ='query';
  } 

  public onValChange(val: string) {
    this.selectedVal = val;
    console.log(val);
  }
}
