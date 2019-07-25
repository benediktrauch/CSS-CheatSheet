import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkMode: BehaviorSubject<boolean>;

  constructor() {
    this.darkMode = new BehaviorSubject<boolean>(true);
  }

  public getDarkmode(): Observable<boolean> {
    return this.darkMode.asObservable();
  }

  public setDarkmode(newValue: boolean): void {
    this.darkMode.next(newValue);
  }
}
