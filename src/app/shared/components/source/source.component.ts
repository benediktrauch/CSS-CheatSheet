import {Component, Input, OnInit} from '@angular/core';
import {Snippet} from '../../services/snippet';

@Component({
  selector: 'csscs-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  @Input() snippet: Snippet;

  // hooks = {
  //   'before-sanity-check': (env) => {
  //     console.log(`before-sanity-check`, env);
  //   },
  //   'before-highlight': (env) => {
  //     console.log(`before-highlight`, env);
  //   },
  //   'after-highlight': (env) => {
  //     console.log(`after-highlight`, env);
  //   },
  //   'complete': (env) => {
  //     console.log(`complete`, env);
  //   },
  //   'before-insert': (env) => {
  //     console.log(`before-insert`, env);
  //   }
  // };
  interpolate = {
    language: 'language interpolated'
  };

  constructor() {
  }

  ngOnInit() {
  }

  makeJSON(code) {
    return JSON.parse(code);
  }


}
