import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { XMLViewerDialogComponent } from './xml-viewer-dialog/xml-viewer-dialog.component';
import { XMLHttpService } from '../services/xml-http.service';
import { map } from 'rxjs/operators';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})

export class QueryComponent implements OnInit {
  hide = true;
  title;
  content;
  items = []
  constructor(public dialog: MatDialog, public httpService: XMLHttpService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(XMLViewerDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: this.title, content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  makeRequest() {
    console.log('A request has been made.');
    this.httpService.getDocumentByTag('hello').subscribe((tag => {   
      this.items = tag.docs;
      return tag;}),
      ); 
  }

}
