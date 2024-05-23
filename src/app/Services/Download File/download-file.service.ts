import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor() { }
  downloadFile(fileName: string, fileUrl: string): void {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
}
