import {Injectable} from '@angular/core';
import {User} from './user';
import {AuthService} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Snippet} from './snippet';
import {shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User>;

  constructor(public authService: AuthService,
              private firestore: AngularFirestore) {
  }

  // _getUserData(): Observable<User> {
  //   const userId = this.authService.getUserId();
  //   this.user = this.firestore
  //     .collection<User>('users')
  //     .doc(userId)
  //     .valueChanges()
  //     .pipe(
  //       shareReplay(1)
  //     ) as Observable<User>;
  //
  //   return this.user;
  // }


}
