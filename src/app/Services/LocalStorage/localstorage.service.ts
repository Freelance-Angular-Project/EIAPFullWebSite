import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable) {
      localStorage.setItem(key, value);
    } else {
      // Fallback storage mechanism or simply do nothing
      // Implement server-side compatible storage if needed
    }
  }

  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable) {
      return localStorage.getItem(key);
    } else {
      // Return value from server-side compatible storage if implemented
      return null; // or a sensible default
    }
  }
}
