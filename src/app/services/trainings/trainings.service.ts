import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { getDoc, doc } from 'firebase/firestore';

import { db } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TrainingsService {

  constructor() { }

  getPurchasedTrainings(userID : string, router : Router) {
    getDoc(doc(db, "users", userID))
    .then((doc) => {
      const data = {userID : userID, userFullName : doc.data().fullName}
      router.navigate(['/purchased-trainings', data])   
    })
  }
}
