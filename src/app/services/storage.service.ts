import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
