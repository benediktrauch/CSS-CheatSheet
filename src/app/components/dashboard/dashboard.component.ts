import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Snippet} from '../../shared/services/snippet';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'csscs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {

  codeSnippets: Snippet[];

  constructor(public authService: AuthService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.codeSnippets = [
      {
        id: '2sfuwh7rzhsif',
        title: 'Cover',
        code: {
          html: `<div class="box"></div>`,
          css: '.box{' +
            'box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);' +
            '}',
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
          css: `.color{
          background: blue;
          }`,
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

}
