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

  color = 'primary';
  editMode: boolean;
  deleteMode: boolean;
  deletingSnippet: boolean;
  selectedSnippet: number;

  editSnippet: Snippet;
  snippetLiked: boolean;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private darkModeService: DarkModeService,
              private sanitizer: DomSanitizer,
              private searchService: SearchService) {

    this.searchService.getSearchString().subscribe(
      value => {
        this.searchString = value;
        // console.log(value);
      }
    );
  }

  identify(index, item) {
    return item.id;
  }

  ngOnInit() {
    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);

    this.$codeSnippets = this.dataService.getUserLikes();
    this.$codeSnippets.subscribe(val => console.log(val));
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

  snippetEdit(snippet) {
    this.editSnippet = snippet;
    this.editMode = true;
    window.scroll(0, 100);
    // this.newSnippet.nativeElement.scrollIntoView();
  }

  cancelEditMode() {
    this.editSnippet = undefined;
    this.toggleEditMode();
  }

  cancelDeleteMode() {
    this.deleteMode = false;
    this.selectedSnippet = undefined;
    this.deletingSnippet = undefined;
  }

  snippetDelete(snippet: Snippet) {
    this.deletingSnippet = true;
    this.dataService.deleteSnippet(snippet)
      .then(res => {
        console.log(res);
        this.cancelDeleteMode();
      });
  }

  confirmDelete(index) {
    this.deleteMode = true;
    this.selectedSnippet = index;
  }

  setSearchString(searchString: string) {
    this.searchService.setSearchString(searchString);
  }

  toggleSnippetLike(snippet: Snippet) {
    this.snippetLiked = !this.snippetLiked;

    this.dataService.saveSnippetLike(snippet);
  }

  isSnippedLiked() {
    return this.snippetLiked;
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
}
