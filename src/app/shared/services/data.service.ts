import {Injectable} from '@angular/core';
import {Snippet} from './snippet';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: Observable<Snippet[]>;

  constructor() {
  }

  codeSnippets: Snippet[] = [
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
        html: `<div class="color">Colored Text</div>`,
        css: `.color{ color: red;}`,
        htmlSource: `<div class="color">Color</div>`, // style="background: blue"
        cssSource: `{"color": "red"}`,
        lang: 'web'
      },
      desc: 'Here comes the text'
    }
  ];

  initSnippets() {
    // this.result = from([this.codeSnippets]);
    this.result = new Observable(observer => {
      observer.next(this.codeSnippets);
    });
  }

  updateSnippets(snippet: Snippet) {

  }

  addSnippet(snippet: Snippet) {
    this.codeSnippets.push(snippet);

    this.result = new Observable(observer => {
      observer.next(this.codeSnippets);
    });
  }

  getSnippets(): Observable<Snippet[]> {

    if (!this.result) {
      this.initSnippets();
    }

    // return from([this.codeSnippets])
    return this.result;
  }

  updateSnippet() {

  }
}
