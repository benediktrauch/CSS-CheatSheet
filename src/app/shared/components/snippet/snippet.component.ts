import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
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

  @Output() snippetEditAction = new EventEmitter();

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

  isMod() {
    return this.authService.isMod();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  snippetEdit(snippet) {
    this.editSnippet = snippet;
    this.editMode = true;
    this.snippetEditAction.emit();
    this.scrollToTop();
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
        // console.log(res);
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

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
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
