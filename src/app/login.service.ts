
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user';
import { UserData } from './user-data';


@Injectable({
  providedIn: 'root'
})

export class LoginService
{
  user$: Observable<User>;
  public credential;

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router,
  )
  {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>
        {
        // Logged in
        if (user)
        {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else
        {
          // Logged out
          return of(null);
      }
    }));
  }

  async googleSignin()
  {
    const provider = new auth.GoogleAuthProvider();
    this.credential = await this.afAuth.auth.signInWithPopup(provider);
    this.afs.collection(`users`, ref => ref.where('uid', '==', this.credential.user.uid)).snapshotChanges().subscribe(res => {
      if (res.length > 0) {
        console.log('Match found.');
      } else {
        console.log('Does not exist.');
        this.initData(this.credential.user);
      }
    });
    return this.router.navigate(['/register/', this.credential.user.uid]);
  }

  emailSignIn(email: string, password: string)
  {
    this.credential = this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      res => {
        console.log('Email login');
        }
    ).catch(err => {
      console.log('Somethings wrong:' , err.message);
    });
  }

  private initData(user)
  {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data =
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,

      fullName: '',
      gender: '',
      number: 0,
      shortDesc: '',
    };

    return userRef.set(data, { merge: true });
  }

  public updateData(user)
  {
    const userRef: AngularFirestoreDocument<UserData> = this.afs.doc(`users/${this.credential.user.uid}`);

    const data =
    {
      fullName: user.fullName,
      gender: user.gender,
      number: user.number,
      shortDesc: user.shortDesc,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut()
  {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

}
