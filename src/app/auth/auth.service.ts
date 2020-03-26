import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from  '../user';
import { UserInfo } from '../userinfo';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  user$: Observable<User>;
  public credential;
  constructor (public afAuth: AngularFireAuth, public afs: AngularFirestore, private router: Router,)  { 

  
  this.user$ = this.afAuth.authState.pipe(switchMap(user =>
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

  async doGoogleLogin()
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


  /*doRegister(value)
  {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }*/
    
  async registerNewUser(email: string, password: string)
  {
    var result = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    this.router.navigate(['/register']);
  }

  login(email: string, password: string)
  {
    this.credential = this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      res => {
        console.log('Email login');
        }
    ).catch(err => {

      console.log('Somethings wrong:' , err.message);
    });
  }

  public updateData(user)
  {
    const userRef: AngularFirestoreDocument<UserInfo> = this.afs.doc(`users/${this.credential.user.uid}`);

    const data =
    {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password
    };
    return userRef.set(data, { merge: true });
  }

  private initData(user)
  {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data =
    {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password
    };

    return userRef.set(data, { merge: true });
    }

  async sendEmailVerification()
  {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string)
  {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  }

  async logout()
  {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean
  {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

}

