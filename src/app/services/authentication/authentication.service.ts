import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getDoc, getDocs, doc, addDoc, setDoc, query, where, collection } from 'firebase/firestore';
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
      getDocs(query(collection(db, "purchases"), where("userID", "==", usr.user.uid)))
      .then((docs) => {
        let alreadyPurchased = false
        docs.docs.forEach((document) => {
          if (document.data().trainingID == data.trainingID) {
            alert("You have already purchased this training")
            alreadyPurchased = true
          }
        })  
        if (!alreadyPurchased) {
          getDoc(doc(db, "users", usr.user.uid))
          .then((document) => {
            if(data.sourcePage == "detailsPage") {
              let userData = document.data()
              let localTime = new Date()
              setDoc(doc(db, "purchases", usr.user.uid + data.trainingID), {
                purchaseID : usr.user.uid + data.trainingID,
                userID : usr.user.uid,
                trainingID : data.trainingID,
                purchaseTime : localTime
              })        
              let recapData = {fullName : userData.fullName, training : data.trainingName, price : data.trainingPrice, userID : usr.user.uid}
              router.navigate(['/recap',recapData]);
            } else if (data.sourcePage == "homePage") {
              const data = {userID : usr.user.uid, userFullName : document.data().fullName}
              router.navigate(['/purchased-trainings', data])
            }
          })
        } else {
          router.navigate(['/home'])
        }
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
          id : usr.user.uid,
          fullName: user.fullname,
          email: user.email,
          phone: user.phoneNumber
        }).then(() => {  
          let localTime = new Date()
          setDoc(doc(db, "purchases", usr.user.uid + data.trainingID), {
            purchaseID : usr.user.uid + data.trainingID,
            userID : usr.user.uid,
            trainingID : data.trainingID,
            purchaseTime : localTime
          })    
          let recapData = {fullName : user.fullname, training : data.trainingName, price : data.trainingPrice, userID : usr.user.uid}
          router.navigate(['/recap',recapData]);})
        .catch(() => console.log("Failed to create doc"))
      })
      .catch((error) => alert("Signup failed : " + error))
    } else {
      alert("Password dont match confirm password")
    }
  }
}
