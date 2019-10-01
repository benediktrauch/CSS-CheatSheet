import {Injectable, NgZone} from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {User} from './user';
import {DataService} from './data.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  private dataSource = new BehaviorSubject({});
  user = this.dataSource.asObservable();

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        // console.log(this.userData);
        this.afs.collection<User>('users').doc(this.userData.uid).get()
          .subscribe(userData => {
            console.log(userData.data());
            this.userData.roles = userData.data().roles;
            console.log(this.userData);
            localStorage.setItem('user', JSON.stringify(this.userData));
            localStorage.setItem('roles', JSON.stringify({roles: userData.data().roles}));
            console.log(JSON.parse(localStorage.getItem('user')));
            console.log(JSON.parse(localStorage.getItem('roles')));

            this.updatedUser(user);
          }
        );

      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  updatedUser(user: User) {
    if (!this.dataSource) {
      this.dataSource = new BehaviorSubject<User>(user);
    } else {
      this.dataSource.next(user);
    }
  }

  getUser() {
    return this.user;
  }

  static get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    return (user !== null && user.emailVerified !== false);
  }


  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = JSON.parse(localStorage.getItem('roles'));
    // console.log(roles);
    return user !== null && roles.roles ? roles.roles.includes('admin') : false;

    // return user !== null && user.roles ? user.roles.includes('admin') : false;
  }


  isMod(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    const roles = JSON.parse(localStorage.getItem('roles'));
    // console.log(roles);
    return user !== null && roles.roles ? (roles.roles.includes('moderator') || roles.roles.includes('admin') ) : false;
    // return user !== null && user.roles ? user.roles.includes('moderator') : false;
  }

  getUserId(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    return user !== null ? user.uid : undefined;
    // return this.userData ? this.userData.uid : undefined;
  }

// Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

// Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

// Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

// Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

// Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
