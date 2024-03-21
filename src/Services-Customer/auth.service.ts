import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor() { }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }
  
  storeUsername(UsernameValue: string) {
    localStorage.setItem('username', UsernameValue)
  }

  gettoken() {
    return localStorage.getItem('token')
  }
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  checktoker():boolean{
    if( localStorage.getItem('token')==null){
      return false
    }else{
      return true
    }
  }

  storerole(tokenValue: number){
    localStorage.setItem('role', String(tokenValue))
  }

  getrole() {
    return localStorage.getItem('role')
  }

  getusername() {
    return localStorage.getItem('username')
  }
  

  storelat(tokenValue: number){
    localStorage.setItem('lat', String(tokenValue))
  }

  getlat() {
    return localStorage.getItem('lat')
  }

  storelon(tokenValue: number){
    localStorage.setItem('lon', String(tokenValue))
  }

  getlon() {
    return localStorage.getItem('lon')
  }

  
}
