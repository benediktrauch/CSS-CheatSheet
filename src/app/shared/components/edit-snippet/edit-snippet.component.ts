import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Snippet} from '../../services/snippet';

export interface Tag {
  name: string;
}

@Component({
  selector: 'csscs-edit-snippet',
  templateUrl: './edit-snippet.component.html',
  styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit {

  @Output() cancelEdit = new EventEmitter<string>();
  @Output() submitEdit = new EventEmitter<Snippet>();

  snippetForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];
  uploading: boolean;

  constructor() {
  }

  ngOnInit() {
    this.snippetForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        Validators.required
      ]),
      htmlSource: new FormControl('', [
        Validators.required
      ]),
      cssSource: new FormControl('', [
        Validators.required
      ])
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  get password() {
    return this.snippetForm.get('password');
  }

  get email() {
    return this.snippetForm.get('email');
  }

  onSubmit() {
    this.uploading = true;

    const s = this.snippetForm.value;
    console.log(s);

    const newSnippet: Snippet = {
      title: s.title,
      desc: s.description,
      code: {
        html: s.htmlSource,
        htmlSource: s.htmlSource,
        css: s.cssSource,
        cssSource: s.cssSource,
        lang: ''
      }
    };

    this.submitEdit.emit(newSnippet);
  }

  checkForm() {
    this.snippetForm.markAllAsTouched();
    console.log(this.snippetForm.value);
  }

  closeEdit() {
    this.cancelEdit.emit();
  }
}
