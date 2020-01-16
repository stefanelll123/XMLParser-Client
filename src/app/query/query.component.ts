import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { XMLViewerDialogComponent } from './xml-viewer-dialog/xml-viewer-dialog.component';
import { XMLHttpService } from '../services/xml-http.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})

export class QueryComponent implements OnInit {
  hide = false;
  title;
  content;
  items = [];

  firstCheck = true;

  query: string = '';
  invalidInput = false;

  regexOrQuery = new RegExp('(select where )(((tag [a-zA-Z]+ contains value [a-zA-Z]+ or )|(tree depth min [0-9]+ or )|(contains tag [a-zA-Z]+ or )|(size=[0-9]+ or )|(tag [a-zA-Z]+ contains child tag [a-zA-Z]+ or )|(attribute [a-zA-Z]+ has value [a-zA-Z0-9]+ or ))*)((tag [a-zA-Z]+ contains value [a-zA-Z]+)|(tree depth min [0-9]+)|(contains tag [a-zA-Z]+)|(size=[0-9]+)|(tag [a-zA-Z]+ contains child tag [a-zA-Z]+)|(attribute [a-zA-Z]+ has value [a-zA-Z0-9]+))');
  regexAndQuery = new RegExp('(select where )(((tag [a-zA-Z]+ contains value [a-zA-Z]+ and )|(tree depth min [0-9]+ and )|(contains tag [a-zA-Z]+ and )|(size=[0-9]+ and )|(tag [a-zA-Z]+ contains child tag [a-zA-Z]+ and )|(attribute [a-zA-Z]+ has value [a-zA-Z0-9]+ and ))*)((tag [a-zA-Z]+ contains value [a-zA-Z]+)|(tree depth min [0-9]+)|(contains tag [a-zA-Z]+)|(size=[0-9]+)|(tag [a-zA-Z]+ contains child tag [a-zA-Z]+)|(attribute [a-zA-Z]+ has value [a-zA-Z0-9]+))');
  regexTagValue = new RegExp('tag [a-zA-Z]+ contains value [a-zA-Z]+');
  regexDepth = new RegExp('tree depth min [0-9]+');
  regexTag = new RegExp('contains tag [a-zA-Z]+');
  regexSize = new RegExp('size=[0-9]+');
  regexTagTag = new RegExp('tag [a-zA-Z]+ contains child tag [a-zA-Z]+');
  regexAttrValue = new RegExp('attribute [a-zA-Z]+ has value [a-zA-Z0-9]+');

  constructor(public dialog: MatDialog, public httpService: XMLHttpService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  public parseQuery() {
    this.items = [];
    this.firstCheck = true;

    if (this.query.indexOf(' or ') != -1) {
      this.parseOperationQuery('or');
    } else {
      this.parseOperationQuery('and');
    }
  }

  private parseOperationQuery(operation: string) {
    if (!this.regexOrQuery.test(this.query)) {
      this.invalidInput = true;
      return;
    }

    const text =  this.query.substring(13);
    const items = text.split(' ' + operation);

    items.forEach(item => {
      const value = item.trim();

      if (this.regexTagValue.test(value)) {
        this.callTagValue(value, operation);
      }

      if (this.regexDepth.test(value)) {
        this.callDepth(value, operation);
      }

      if (this.regexTag.test(value)) {
        this.callTag(value, operation);
      }

      if (this.regexSize.test(value)) {
        this.callSize(value, operation);
      }

      if (this.regexTagTag.test(value)) {
        this.callTagTag(value, operation);
      }

      if (this.regexAttrValue.test(value)) {
        this.callAttrValue(value, operation);
      }
    });
  }

  callTagValue(query: string, operation: string) {
    const params = query.split(' ');
    this.httpService.getDocumentWithWordBelowTag(params[1], params[4]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
    console.log(params);
  }

  callDepth(query: string, operation: string) {
    const params = query.split(' ');
    this.httpService.getDocumentByDepth(params[3]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
    console.log(params);
  }

  callTag(query: string, operation: string) {
    const params = query.split(' ');
    this.httpService.getDocumentByTag(params[2]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
    console.log(this.items);
  }

  callSize(query: string, operation: string) {
    const params = query.split('=');
    this.httpService.getDocumentBySize(params[1]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
    console.log(params);
  }

  callTagTag(query: string, operation: string) {
    const params = query.split(' ');
    this.httpService.getDocumentByTagUnderTag(params[1], params[5]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
    console.log(params);
  }

  callAttrValue(query: string, operation: string) {
    const params = query.split(' ');
    this.httpService.getDocumentByAttrValue(params[1], params[4]).subscribe(tag => {
      this.addItem(tag['docs'], query, operation);
    });
  }

  openDialog(item): void {
    this.httpService.getContentXML(item['path']).subscribe(content => {
      const dialogRef = this.dialog.open(XMLViewerDialogComponent, {
        width: '600px',
        height: '450px',
        data: {content: content}
      });
      dialogRef.afterClosed().subscribe(result => {
        this.hide = this.hide ? false : true;
      });
    });

  }

  changeQuery(event) {
    this.invalidInput = false;
    this.query = event.srcElement.value;
  }

  private addItem(addList, query: string, operation: string) {
    if (operation == 'or') {
      addList.forEach(item => {
        item.query = query;
        this.items.push(item);
      });
      return;
    }

    if (this.firstCheck == true) {
      this.items = this.items.concat(addList);
      this.firstCheck = false;
      return;
    }

    this.items = this.items.filter(value => this.isInCollection(addList, value));
  }

  private isInCollection(list, value) {
    let result = false;
    list.forEach(element => {
      if (element._id == value._id) {
        result = true;
      }
    });

    return result;
  }
}
