import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchString: BehaviorSubject<string>;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams
      .pipe(filter(e => e.search ))
      .subscribe(params => {
        // console.log(params);
        this.setSearchString(params.search);
      });

    this.searchString = new BehaviorSubject<string>('');
  }

  public getSearchString(): Observable<string> {
    return this.searchString.asObservable();
  }

  public setSearchString(newValue: string): void {
    this.searchString.next(newValue);
  }
}
