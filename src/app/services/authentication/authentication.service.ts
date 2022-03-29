import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getDoc, doc, collection, addDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

import { UserSignin, UserSignup } from '../../Models/user.interface';
import { auth, db} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor() { }

  loginUser(data : any, user : UserSignin, router : Router) :void {
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((usr)=>{
      getDoc(doc(db, "users", usr.user.uid))
      .then((doc) => {
        const userData = doc.data()
        data = {...data, fullName: userData.FullName}          
        router.navigate(['/recap',data]);
      })
    }).catch(()=>{
      alert('Email or password is incorrect');
    });
  }

  signUp(password : string, confirmPassword : string, user : UserSignup, data : any, router : Router) : void {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, user.email, password)
      .then((usr) => {
        setDoc(doc(db, "users", usr.user.uid), {
          FullName: user.fullname,
          Email: user.email,
          Phone: user.phoneNumber
        }).then(() => {          
          data = {...data, fullName: user.fullname}
          router.navigate(['/recap',data]);})
        .catch(() => console.log("Failed to create doc"))
      })
      .catch(() => alert("Signup failed"))
    } else {
      alert("Password dont match confirm password")
    }
  }
}
