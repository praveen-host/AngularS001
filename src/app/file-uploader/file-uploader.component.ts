import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    this.uploadToServer(fileToUpload);


  }


  uploadToServer = (fileToUpload: File) => {
    var chunkSize = 10 * 1024 * 1024;
    var chunkCount = Math.ceil(fileToUpload.size / chunkSize);
    console.log(fileToUpload.size, "   ", chunkCount, "  ", chunkSize);
    var requests = [];

    for (var i = 0; i < chunkCount; i++) {
      this.postData(i, chunkSize, fileToUpload).subscribe({
        next: (data) => {

        },
        error: (er) => { }
      });
    }
  }

  postData = (i: number, chunkSize: number, fileToUpload: File) => {

    var blob = fileToUpload.slice(i * chunkSize, (i + 1) * chunkSize < fileToUpload.size ? (i + 1) * chunkSize : fileToUpload.size);
blob .text()
.then((x) => Md5.hashAsciiStr(x))
.then((hash) => {
//  this.fileMd5Hash = hash;
  console.log(hash);
});

    var a = new FileReader();
    a.onloadend = function () {
      var sss:string=a.result+"";
      console.log(Md5.hashAsciiStr(sss));
    };
    a.readAsBinaryString(blob);
    
    const formData = new FormData();
    formData.append('file', blob,fileToUpload.name);
    formData.append('chunkCount','1111111');
    return this.http.post('http://localhost:12161/api/UploadFile/FileUploadInprogress?chunkId=' + i + "&chunkSize=" + chunkSize + "&fileName=" + fileToUpload.name, formData);

  };


}
