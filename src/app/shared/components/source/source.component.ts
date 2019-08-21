import {Component, Input, OnInit} from '@angular/core';
import {Snippet} from '../../services/snippet';

@Component({
  selector: 'csscs-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  @Input() snippet: Snippet;

  interpolate = {
    language: 'language interpolated'
  };

  constructor() {
  }

  ngOnInit() {
  }
}
