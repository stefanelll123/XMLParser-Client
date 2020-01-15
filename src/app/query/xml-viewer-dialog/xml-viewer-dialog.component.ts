import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DialogData {
  title: string;
  content: string;
}


@Component({
  selector: 'app-xml-viewer-dialog',
  templateUrl: './xml-viewer-dialog.component.html',
})
export class XMLViewerDialogComponent {
  search: string = "title"
  constructor(
    public dialogRef: MatDialogRef<XMLViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
