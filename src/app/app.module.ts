import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from './shared/services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
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
import { SnippetComponent } from './shared/components/snippet/snippet.component';
import { SourceComponent } from './shared/components/source/source.component';
import {PrismModule} from '@ngx-prism/core';
import { MenuComponent } from './shared/components/menu/menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EditSnippetComponent } from './shared/components/edit-snippet/edit-snippet.component';
import {NgPipesModule} from 'ngx-pipes';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    SnippetComponent,
    SourceComponent,
    MenuComponent,
    EditSnippetComponent,
    FilterPipe
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrismModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    NgPipesModule,
    FormsModule
  ],
  exports: [
    SnippetComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
