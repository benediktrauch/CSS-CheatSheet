import {Component, Input, OnInit} from '@angular/core';
import {Snippet} from '../../services/snippet';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'csscs-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit {

  @Input() snippet: Snippet;

  currentStyles: {};

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    console.log(this.snippet);

    console.log(JSON.parse(this.snippet.code.cssSource));
    // this.currentStyles = {
    //   color: 'red'
    // };
    // console.log(this.currentStyles);

    this.currentStyles = JSON.parse(this.snippet.code.cssSource);
  }

  makeStyleTrusted(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  makeHtmlTrusted(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(currentStyles, html) {
    return `<style>${currentStyles.toString()}</style>${html}`;
  }
}
