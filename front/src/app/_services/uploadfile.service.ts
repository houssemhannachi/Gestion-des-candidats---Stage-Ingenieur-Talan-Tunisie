import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})

export class UploadFileService {

   constructor(private httpClient: HttpClient) { }
   /*pushFileToStorage(file: File):  Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/savefile`, file);
   }*/
     pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', '/server/api/file/savefile', data,
     {
    reportProgress: true,
    responseType: 'text'
    });    return this.httpClient.request(newRequest);
  }
  /*SERVER_URL: string = "http://localhost:8080/api/file/upload";  

  public upload(formData:any) {
    console.log("upload service function is called")
    console.log(formData)
    return this.httpClient.post<FormData>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }*/

}
