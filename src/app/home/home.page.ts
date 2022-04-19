import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, getDocs } from 'firebase/firestore';

import { Training } from './../Models/training.interface';
import { db } from './../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  trainingsList: Array<Training>;
  loaded: boolean;

  constructor(private router: Router, public alertController: AlertController) {
    getDocs(collection(db, 'trainings'))
    .then((snapshot)=>{
      const allTrainings = [];
      snapshot.docs.forEach((doc)=>{
        allTrainings.push(doc.data());
      });
      this.trainingsList = allTrainings;
    }).then(() => {
      this.loaded = true;
    })
    .catch(() => alert('Could not load the data from the server'));
  }

  ngOnInit(): void {
  }

  showInfo(training: any): void {
    this.router.navigate(['/details', training]);
  }

  showPurchasedTrainings() {
    this.router.navigate(['/login'], {queryParams: {sourcePage : 'homePage'}});
  }
}
