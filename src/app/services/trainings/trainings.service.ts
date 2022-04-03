import { Injectable } from '@angular/core';
import { getDocs, collection } from 'firebase/firestore';

import { db } from 'src/environments/environment';
import { Training } from './../../Models/training.interface';

@Injectable({
  providedIn: 'root'
})

export class TrainingsService {

  constructor() { }

  getAllTrainings(trainingsList : Array<Training>, loaded : boolean) {
    console.log("Before getDocs");
    
    getDocs(collection(db, 'trainings'))
    .then((snapshot)=>{
      console.log("Inside first then");
      
      const allTrainings = [];
      snapshot.docs.forEach((doc)=>{
        console.log("INside foreach");
        
        allTrainings.push(doc.data());
      });
      console.log("After foreach");
      
      trainingsList = allTrainings;
    }).then(() => {
      console.log("Iside the second then");
      
      loaded = true
      console.log(loaded);
      
    })
    .catch(() => alert("Could not load the data from the server"));
  }
}
