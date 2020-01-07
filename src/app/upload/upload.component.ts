import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public fileEvent(fileInput: any) {
    console.log(fileInput);
    const file = fileInput.target.files[0];
    const fileName = file.name;

    const formData = new FormData();
    formData.append('file', file);

    console.log(formData);
  }
}
