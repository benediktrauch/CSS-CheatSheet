import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Snippet} from '../../shared/services/snippet';
import {DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../../shared/services/data.service';
import {Observable} from 'rxjs';
import {DarkModeService} from '../../shared/services/dark-mode.service';
import {SearchService} from '../../shared/services/search.service';

@Component({
  selector: 'csscs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  @ViewChild('newSnippet', {static: false}) newSnippet: ElementRef;
  $codeSnippets: Observable<Snippet[]>;
  darkMode = true;

  searchString: string;
  orderByString: string;

  color = 'primary';
  editMode: boolean;
  deleteMode: boolean;
  deletingSnippet: boolean;
  selectedSnippet: number;

  editSnippet: Snippet;
  snippetLiked: boolean;
  openFilter: boolean;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private darkModeService: DarkModeService,
              private sanitizer: DomSanitizer,
              private searchService: SearchService) {

    this.searchService.getSearchString().subscribe(
      value => {
        this.searchString = value;
      }
    );
  }

  identify(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);

    this.$codeSnippets = this.dataService.getUserLikes();
    // this.$codeSnippets.subscribe(val => console.log(val));
    this.orderByString = '';
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  addOrUpdateSnippet(event) {
    console.log(event);
    event.id ? (
      this.dataService.updateSnippet(event)
        .then(value => {
          console.log(value);
          this.cancelEditMode();
        })
    ) : (
      this.dataService.addSnippet(event)
        .then(value => {
          console.log(value);
          this.cancelEditMode();
        })
    );

    // setTimeout(() => {
    //   this.toggleEditMode();
    // }, 2500);
  }

  isLoggedIn() {
    return AuthService.isLoggedIn;
  }

  toggleDarkMode() {
    this.darkModeService.setDarkmode(!this.darkMode);
  }

  cancelEditMode() {
    this.editSnippet = undefined;
    this.toggleEditMode();
  }

  setSearchString(searchString: string) {
    this.searchService.setSearchString(searchString);
  }

  toggleFilter() {
    this.openFilter = !this.openFilter;
  }

  snippetEdit(snippet) {
    this.editSnippet = snippet;
    this.editMode = true;
    // window.scroll(0, 100);
    this.newSnippet.nativeElement.scrollIntoView();
    window.scroll(0, 100);
    // this.newSnippet.nativeElement.scrollIntoView();
  }

  scrollToElement($element): void {
    // console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
