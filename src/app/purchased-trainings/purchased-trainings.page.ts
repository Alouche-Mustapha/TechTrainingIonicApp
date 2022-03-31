import { db } from './../../environments/environment';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { query, where, getDocs, collection, getDoc, doc } from 'firebase/firestore'

@Component({
  selector: 'app-purchased-trainings',
  templateUrl: './purchased-trainings.page.html',
  styleUrls: ['./purchased-trainings.page.scss'],
})
export class PurchasedTrainingsPage implements OnInit {

  purchasedTrainings : Array<{purchasedTraining : string, purchasePrice : number, purchaseDate : string, purchaseTime : string}>
  userFullName : string
  loaded : boolean

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.userFullName = this.route.snapshot.params.userFullName
    getDocs(query(collection(db, "purchases"), where("userID", "==", this.route.snapshot.params.userID)))
    .then((docs) => {
      let trainings = []
      docs.docs.forEach((document) => {
        getDoc(doc(db, "trainings", document.data().trainingID))
        .then((doc) => {
          const transformedData = {
            purchasedTraining : doc.data().name,
            purchasePrice : doc.data().price,
            purchaseDate : new Date(document.data().purchaseTime.seconds * 1000).toISOString().slice(0, 10),
            purchaseTime : new Date(document.data().purchaseTime.seconds * 1000).toISOString().slice(11, 19)
          }        
          trainings.push(transformedData)
        })
      })   
      this.purchasedTrainings = trainings           
    }).then(() => {
      this.loaded = true
    })
    .catch((error) => alert("The error is : " + error))
  }

  homePage(){
    this.router.navigate(['/home']);
  }
}