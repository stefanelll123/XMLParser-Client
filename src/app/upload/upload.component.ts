import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UploadFileModel } from './upload-file.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  fileUploaded: File;
  fileName: string = 'No file yet';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  public readSingleFile(event: any) {
    this.fileUploaded = event.target.files[0];
    const file = event.target.files[0];
    this.fileName = file.name;

  }

  public upload() {
    if (!this.fileUploaded) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (result: any) => {
      // const fileName = result.target.files[0].name;
      console.log(result.target);
      const contents = result.target.result;
      const uploadFileModel = new UploadFileModel(this.fileName, contents.toString());

      this.sendMessage(uploadFileModel);
    };

    reader.readAsText(this.fileUploaded);
  }

  private sendMessage(uploadFileModel: UploadFileModel) {
    this.httpClient.post<UploadFileModel>(environment.url + 'upload_file', uploadFileModel)
      .subscribe(res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }
}
