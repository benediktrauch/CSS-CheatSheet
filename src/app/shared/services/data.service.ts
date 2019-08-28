import {Injectable} from '@angular/core';
import {Snippet} from './snippet';
import {combineLatest, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {shareReplay} from 'rxjs/operators';
import * as firebase from 'firebase';
import {AuthService} from './auth.service';
import {User} from './user';
import GetOptions = firebase.firestore.GetOptions;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user$: User;

  result: Observable<Snippet[]>;
  snippet$: Observable<Snippet[]>;
  snippets: Snippet[];
  likedSnippets: Snippet[];
  likedSnippets$: Observable<Snippet[]>;


  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
    // this.querySnippets();
    // this.getUserLikes();
    // this.authService.getUser().subscribe(
    //   value => {
    //     // console.log(value);
    //     // this.getUserLikes();
    //   }
    // );
    firebase.firestore().enablePersistence()
      .catch((err) => {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
        } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
        }
      });
  }

  addSnippet(snippet: Snippet) {
    snippet.createdAt = firebase.firestore.FieldValue.serverTimestamp();

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

  updateSnippet(snippet: Snippet) {
    delete snippet.liked;
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
  }

  saveSnippetLike(snippet: Snippet) {
    const user = this.authService.userData;

    const likesCollectionRef = this.firestore
      .collection(`users`)
      .doc(user.uid)
      .collection('likes');

    return likesCollectionRef.get()
      .toPromise()
      .then(likes => {
        let docId;
        likes.docs.forEach(like => {
          if (like.data().snippetId === snippet.id) {
            docId = like.data().id;
          }
        });
        if (docId) {
          likesCollectionRef
            .doc(docId).delete().then(() => console.log(`Document with ID: ${docId} deleted`));
        } else {
          likesCollectionRef
            .add({snippetId: snippet.id, liked: snippet.liked}).then(docRef => {
            likesCollectionRef
              .doc(docRef.id)
              .update({id: docRef.id})
              .then(() => console.log('Document written with ID: ', docRef.id)
              );
          })
            .catch(error => {
              console.error('Error adding document: ', error);
            });
        }
      });
  }

  getUserLikes(): Observable<Snippet[]> {
    const userId = this.authService.getUserId();

    const obs1 = this.firestore.collection<Snippet>('snippet').valueChanges();
    // const obs1 = this.firestore.collection<Snippet>('snippet').get(getOptions);

    if (AuthService.isLoggedIn && userId) {
      const obs2 = this.firestore.collection<User>('users').doc(userId).collection<User>('likes').valueChanges();
      this.likedSnippets$ = combineLatest<Snippet[]>(obs1, obs2, (snippets: Snippet[], likes) => {
        const newSnippets = [];
        snippets.forEach(snippet => {
          const found = likes.find((like: any) => like.snippetId === snippet.id);
          if (found) {
            snippet.liked = found.liked;
          }
          newSnippets.push(snippet);
        });
        return newSnippets;
      });
      return this.likedSnippets$.pipe(shareReplay(1));
    } else {
      this.likedSnippets$ = obs1.pipe(shareReplay(1));
      return this.likedSnippets$;
    }
  }
}
