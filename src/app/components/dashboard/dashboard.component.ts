import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Snippet} from '../../shared/services/snippet';
import {DomSanitizer} from '@angular/platform-browser';
import {DataService} from '../../shared/services/data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'csscs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  // @ViewChild('switchControl', {static: false}) switchControl: MDCSwitch;
  $codeSnippets: Observable<Snippet[]>;
  nightMode = true;

  color = 'primary';
  editMode: boolean;

  constructor(public authService: AuthService,
              private dataService: DataService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.$codeSnippets = this.dataService.getSnippets();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  addSnippet(event) {
    console.log(event);
    this.dataService.addSnippet(event);

    setTimeout(() => {
      this.toggleEditMode();
    }, 2500);
  }

  updateSnippet() {
    this.dataService.updateSnippet();
  }

  // makeStyleTrusted(style) {
  //   return this.sanitizer.bypassSecurityTrustStyle(style);
  // }
  // makeHtmlTrusted(html) {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  // }

  isLoggedIn() {
    return AuthService.isLoggedIn;
  }

  toggleNightMode() {
    this.nightMode = !this.nightMode;
    // this.switchControl.checked = this.nightMode;
  }
}
