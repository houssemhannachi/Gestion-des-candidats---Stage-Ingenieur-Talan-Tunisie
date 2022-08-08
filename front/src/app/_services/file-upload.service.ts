import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private httpClient:HttpClient) { }
  SERVER_URL: string = "http://localhost:8080/fileUpload/upload";

  public upload(formData:any) {
    console.log("upload service function is called")
    console.log(formData)
    return this.httpClient.post<FormData>(this.SERVER_URL, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }


}
