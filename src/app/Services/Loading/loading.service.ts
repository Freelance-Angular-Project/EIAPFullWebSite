import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(private spinner: NgxSpinnerService) {}

  startLoading() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000); // Automatically hide after 2 seconds
  }

  // You can still manually stop the loading if needed
  stopLoading() {
    this.spinner.hide();
  }
}
