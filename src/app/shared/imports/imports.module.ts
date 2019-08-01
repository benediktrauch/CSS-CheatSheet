import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ]
})
export class ImportsModule { }
