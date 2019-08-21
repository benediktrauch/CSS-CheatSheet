import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {DarkModeService} from '../../services/dark-mode.service';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'csscs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  @ViewChild('outline', {static: false}) outline: ElementRef;
  @ViewChild('inline', {static: false}) inline: ElementRef;
  @ViewChild('circle', {static: false}) circle: ElementRef;

  circleStroke = 0;
  inlineStroke = 0;
  outlineStroke = 0;

  myControl: FormControl;
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  darkMode: boolean;
  searchString: string;

  constructor(public authService: AuthService,
              private darkModeService: DarkModeService,
              private searchService: SearchService) {
  }

  ngOnInit() {

    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);

    this.myControl = new FormControl('', [
      Validators.required
    ]);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.searchService.getSearchString().subscribe(
      value => {
        this.searchString = value;
      }
    );
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
    // console.log(this.outline.nativeElement);
    // console.log(this.outline.nativeElement.getTotalLength());
    // console.log(this.inline.nativeElement);
    // console.log(this.inline.nativeElement.getTotalLength());
    // console.log(this.circle.nativeElement);
    // console.log(this.circle.nativeElement.getTotalLength());

    this.outlineStroke = this.outline.nativeElement.getTotalLength();
    this.circleStroke = this.circle.nativeElement.getTotalLength();
    this.inlineStroke = this.inline.nativeElement.getTotalLength();


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  isLoggedIn(): boolean {
    return AuthService.isLoggedIn;
  }

  logout() {
    this.authService.SignOut().then();
  }

  toggleDarkMode() {
    this.darkModeService.setDarkmode(!this.darkMode);
  }

  search(event) {
    this.searchService.setSearchString(this.searchString);
  }
}
