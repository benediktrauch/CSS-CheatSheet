import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Snippet} from '../../shared/services/snippet';
import {DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../../shared/services/data.service';
import {Observable} from 'rxjs';
import {DarkModeService} from '../../shared/services/dark-mode.service';

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

  color = 'primary';
  editMode: boolean;

  editSnippet: Snippet;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private darkModeService: DarkModeService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);

    this.$codeSnippets = this.dataService.getSnippets();
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
    // window.scroll(0, 100);
    this.newSnippet.nativeElement.scrollIntoView();
  }

  cancelEditMode() {
    this.editSnippet = undefined;
    this.toggleEditMode();
  }
}
