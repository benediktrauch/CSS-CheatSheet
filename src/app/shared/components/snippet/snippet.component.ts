import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Snippet} from '../../services/snippet';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  // encapsulation: ViewEncapsulation.None,
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
    // console.log(this.snippet);

    // console.log(JSON.parse(this.snippet.code.cssSource));
    // this.currentStyles = {
    //   color: 'red'
    // };
    // console.log(this.currentStyles);

    // this.currentStyles = JSON.parse(this.snippet.code.cssSource);
  }

  makeStyleTrusted(style) {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  makeHtmlTrusted(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCSS(currentStyles) {
    return this.makeHtmlTrusted(`<style type="text/css">${currentStyles}</style>`);
  }

  getCode(currentStyles, html) {

    const code = this.makeHtmlTrusted(`
    <html lang="en">
    <head>
    <style type="text/css">${currentStyles}</style>
</head>
<body>
<div [innerHTML]="${this.makeHtmlTrusted(html)}"></div>
</body>
</html>
`);

    console.log(code);

    return code;
  }
}
