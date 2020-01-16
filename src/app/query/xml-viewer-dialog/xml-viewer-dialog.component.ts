import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  title: string;
  content;
}


@Component({
  selector: 'app-xml-viewer-dialog',
  templateUrl: './xml-viewer-dialog.component.html',
})
export class XMLViewerDialogComponent {
  search: string = "title"
  content 
  constructor(
    public dialogRef: MatDialogRef<XMLViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.content = data.content.content;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
