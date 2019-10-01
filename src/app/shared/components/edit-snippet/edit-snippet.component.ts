import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Snippet} from '../../services/snippet';
import {DataService} from '../../services/data.service';
import {DarkModeService} from '../../services/dark-mode.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'csscs-edit-snippet',
  templateUrl: './edit-snippet.component.html',
  styleUrls: ['./edit-snippet.component.scss']
})
export class EditSnippetComponent implements OnInit {

  @Input() snippet: Snippet;
  @Output() cancelEdit = new EventEmitter<string>();
  @Output() submitEdit = new EventEmitter<Snippet>();

  darkMode = true;

  snippetForm: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [
    {name: 'css'},
    {name: 'html'}
  ];
  uploading: boolean;

  buttonText: string;
  snippetPreview: Snippet;

  constructor(private darkModeService: DarkModeService) {
  }

  ngOnInit() {
    this.darkModeService.getDarkmode().subscribe(value => this.darkMode = value);
    // console.log(this.snippet);
    if (this.snippet) {
      this.buttonText = 'Update Snippet';
      this.tags = this.snippet.tags;
    } else {
      this.buttonText = 'Add to Database';
    }
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
      ]),
      tags: new FormControl([])
    });

    if (this.snippet && this.snippet.title) {
      this.snippetForm
        .patchValue({
          title: this.snippet.title,
          description: this.snippet.desc,
          htmlSource: this.snippet.code.html,
          cssSource: this.snippet.code.css,
          tags: this.snippet.tags
        });
      this.snippetPreview = this.snippet;
    }
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

  onSubmit() {
    this.uploading = true;

    const s = this.snippetForm.value;
    // console.log(s);
    // console.log(this.tags);

    const newSnippet: Snippet = {
      title: s.title,
      desc: s.description,
      code: {
        html: s.htmlSource,
        css: s.cssSource,
        lang: ''
      },
      tags: this.tags
    };

    if (this.snippet && this.snippet.id) {
      newSnippet.id = this.snippet.id;
    }
    // console.log(newSnippet);

    this.submitEdit.emit(newSnippet);
  }

  checkForm() {
    this.snippetForm.markAllAsTouched();
    // console.log(this.snippetForm.value);
  }

  closeEdit() {
    this.cancelEdit.emit();
  }

  updatePreview() {
    const s = this.snippetForm.value;
    this.snippetPreview = {
      title: s.title,
      desc: s.description,
      code: {
        html: s.htmlSource,
        css: s.cssSource,
        lang: ''
      },
      tags: this.tags
    };

  }
}
