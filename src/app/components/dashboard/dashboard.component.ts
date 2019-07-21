import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Snippet} from '../../shared/services/snippet';
import {DomSanitizer} from '@angular/platform-browser';
import {MDCSwitch} from '@material/switch/component';

@Component({
  selector: 'csscs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  @ViewChild('switchControl', {static: false}) switchControl: MDCSwitch;
  codeSnippets: Snippet[];
  nightMode = true;

  color = 'primary';

  constructor(public authService: AuthService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.codeSnippets = [
      {
        id: '2sfuwh7rzhsif',
        title: 'Box Shadow',
        code: {
          html: `<div class="box">Box</div>`,
          css: `
.box {
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
`,
          htmlSource: `<div class="box">Box</div>`,
          cssSource: `{"box-shadow": "0px 2px 2px 1px rgba(0, 0, 0, 0.2)"}`,
          lang: 'web'
        },
        desc: 'Here comes the text'
      },
      {
        id: 'ss32k7rzhsif',
        title: 'Cover',
        code: {
          html: `<div class="color"></div>`,
          css: `.color{ color: red;}`,
          htmlSource: `<div>Color</div>`, // style="background: blue"
          cssSource: `{"color": "red"}`,
          lang: 'web'
        },
        desc: 'Here comes the text'
      }
    ];

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
