import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  setData(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getData(key: string): any {
    const data = localStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
    return null; // or any other default value you want to return
  }
   deletekeyFromLocalStorage(key:any) {
    localStorage.removeItem(key);
}

}

