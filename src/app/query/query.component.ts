import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { XMLViewerDialogComponent } from './xml-viewer-dialog/xml-viewer-dialog.component';
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  hide = true;
  title;
  content;
  items = [{name: "XML name 1", hide: true}, {name: "XML name 2", hide: false}, {name: "XML name 3", hide: false}, {name: "XML name 4", hide:true}]
  constructor(public dialog: MatDialog) { }

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

}
