import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/environments/environment';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  recapData : any

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.recapData = this.route.snapshot.params  
    console.log(this.recapData);
  }

  homePage() : void {
    this.router.navigate(['/home'])
  }

  purchasedTrainings() : void {
    getDoc(doc(db, "users", this.recapData.userID))
    .then((doc) => {
      const data = {userID : this.recapData.userID, userFullName : doc.data().fullName}
      this.router.navigate(['/purchased-trainings', data])   
    })
  }
}
