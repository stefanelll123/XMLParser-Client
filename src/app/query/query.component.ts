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

  query: string = '';
  invalidInput = false;

  // tslint:disable-next-line: max-line-length
  regexQuery = new RegExp('(select where )(((tag [a-zA-Z]+ contains value [a-zA-Z]+ and )|(tree depth min [0-9]+ and)|(contains tag [a-zA-Z]+ and )|(size=[0-9]+ and ))*)((tag [a-zA-Z]+ contains value [a-zA-Z]+)|(tree depth min [0-9]+)|(contains tag [a-zA-Z]+)|(size=[0-9]+))');
  regexTagValue = new RegExp('tag [a-zA-Z]+ contains value [a-zA-Z]+');
  regexDepth = new RegExp('tree depth min [0-9]+');
  regexTag = new RegExp('contains tag [a-zA-Z]+');
  regexSize = new RegExp('size=[0-9]+');

  constructor(public dialog: MatDialog, public httpService: XMLHttpService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  public parseQuery() {
    if (!this.regexQuery.test(this.query)) {
      this.invalidInput = true;
      return;
    }

    const text =  this.query.substring(13);
    const items = text.split('and');

    items.forEach(item => {
      const value = item.trim();

      if (this.regexTagValue.test(value)) {
        this.callTagValue(value);
      }

      if (this.regexDepth.test(value)) {
        this.callDepth(value);
      }

      if (this.regexTag.test(value)) {
        this.callTag(value);
      }

      if (this.regexSize.test(value)) {
        this.callSize(value);
      }
    });
  }

  callTagValue(query: string) {
    const params = query.split(' ');
    console.log(params);
  }

  callDepth(query: string) {
    const params = query.split(' ');
    console.log(params);
  }

  callTag(query: string) {
    const params = query.split(' ');
    this.httpService.getDocumentByTag(params[2]).subscribe((tag => {
      this.items = tag.docs;
      return tag;
    }));
    console.log(params);
  }

  callSize(query: string) {
    const params = query.split('=');
    console.log(params);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(XMLViewerDialogComponent, {
      width: '500px',
      height: '500px',
      data: {title: this.title, content: this.content}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  makeRequest() {
    console.log('A request has been made.');
    this.httpService.getDocumentByTag('hello').subscribe((tag => {
      this.items = tag.docs;
      return tag;
    }));
  }

  changeQuery(event) {
    this.invalidInput = false;
    this.query = event.srcElement.value;
  }
}
