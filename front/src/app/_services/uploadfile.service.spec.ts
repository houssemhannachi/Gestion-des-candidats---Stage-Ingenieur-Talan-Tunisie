import { TestBed } from '@angular/core/testing';
import {UploadFileService} from "./uploadfile.service";

describe('UploadfileService', () => {
  let service: UploadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
