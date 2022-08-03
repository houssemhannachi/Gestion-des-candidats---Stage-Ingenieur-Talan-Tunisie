import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType} from '@angular/common/http';
import {UploadFileService} from "../_services/uploadfile.service";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  title = 'File-Upload-Save';
  selectedFiles:any = [];
  currentFileUpload: any ;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;


  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  downloadFile(){    
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();  }

    change($event:any) {
    this.changeImage = true;
  }

  changedImage(event:any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
     this.progress.percentage = 0;
     this.currentFileUpload = this.selectedFiles.item(0);

    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded);
      } else if (event instanceof HttpResponse) {
         alert('File Successfully Uploaded');
      }
      this.selectedFiles = undefined;
     }
    );
  }

  selectFile(event:any) {
    this.selectedFiles = event.target.files;
  }
}

