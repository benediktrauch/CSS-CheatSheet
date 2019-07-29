import {Injectable} from '@angular/core';
import {Snippet} from './snippet';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {filter, map, shareReplay} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  result: Observable<Snippet[]>;
  snippet$: Observable<Snippet[]>;


  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
    this.querySnippets();
  }

  querySnippets() {
    console.log(firebase.firestore.FieldValue.serverTimestamp());
    this.snippet$ = this.firestore
      .collection('snippet')
      .valueChanges()
      .pipe(
        shareReplay(1)
      ) as Observable<Snippet[]>;
  }

  addSnippet(snippet: Snippet) {
    snippet.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    // snippet.createdBy = this.authService.getUserId();

    return this.firestore
      .collection('snippet')
      .add(snippet)
      .then(docRef => {
        this.firestore.collection('snippet')
          .doc(docRef.id)
          .update({id: docRef.id})
          .then(() => console.log('Document written with ID: ', docRef.id)
          );
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }

  getSnippets(): Observable<Snippet[]> {
    if (!this.snippet$) {
      this.querySnippets();
    }
    return this.snippet$;
  }

  updateSnippet(snippet: Snippet) {
    snippet.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection('snippet')
      .doc(snippet.id)
      .update(snippet);
  }

  deleteSnippet(snippet: Snippet) {
    return this.firestore
      .collection('deleted')
      .add(snippet)
      .then(() => {
        return this.firestore.collection('snippet')
          .doc(snippet.id)
          .delete();
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });

    // return this.firestore.collection('snippet')
    //   .doc(snippet.id)
    //   .update({deleted: true})
    //   .then(() => console.log(`Document with ID: ${snippet.id} deleted!`)
    //   );

    //
    // return this.firestore.collection('snippet')
    //   .doc(snippet.id)
    //   .delete();
  }
}
