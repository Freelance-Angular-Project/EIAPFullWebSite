import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public showToast: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public message: BehaviorSubject<string> = new BehaviorSubject('');
  public isError: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
  show(message: string, isError: boolean = false) {
    this.message.next(message);
    this.isError.next(isError);
    this.showToast.next(true);

    if (!isError) {
      setTimeout(() => this.showToast.next(false), 3000); // Auto-hide after 3 seconds for non-error messages
    }
  }
}
