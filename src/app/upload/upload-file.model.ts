export class UploadFileModel {
  file_name: string;
  content: string;

  public constructor(fileName: string, content: string) {
    this.file_name = fileName;
    this.content = content;
  }
}
