import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Snippet} from '../../services/snippet';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../services/auth.service';
import {DataService} from '../../services/data.service';
import {DarkModeService} from '../../services/dark-mode.service';
import {SearchService} from '../../services/search.service';
import {Observable} from 'rxjs';

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'csscs-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  @Input() snippet: Snippet;
  @Input() index: number;

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
  // el: any;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private darkModeService: DarkModeService,
              private sanitizer: DomSanitizer,
              private searchService: SearchService) {
  }

  ngOnInit() {
    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);
    this.deleteMode = false;
    this.deletingSnippet = false;

  }

  identify(index, item) {
    return item.id;
  }

  isLoggedIn() {
    return AuthService.isLoggedIn;
  }

  snippetEdit(snippet) {
    this.editSnippet = snippet;
    this.editMode = true;
    window.scroll(0, 100);
    // this.newSnippet.nativeElement.scrollIntoView();
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

  toggleSnippetLike(snippet: Snippet) {
    snippet.liked = !snippet.liked;
    this.dataService.saveSnippetLike(snippet);
  }

  // isElementInViewport(el) {
  //
  //   this.el = el;
  //   const rect = el.getBoundingClientRect();
  //
  //   return rect.bottom > 0 &&
  //     rect.right > 0 &&
  //     rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
  //     rect.top < (window.innerHeight || document.documentElement.clientHeight);
  // }
  //
  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll($event) {
  //   this.isElementInViewport(this.el);
  // }
}
