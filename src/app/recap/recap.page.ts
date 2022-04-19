import { TrainingsService } from './../services/trainings/trainings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.page.html',
  styleUrls: ['./recap.page.scss'],
})
export class RecapPage implements OnInit {

  trainingsService = new TrainingsService();
  recapData: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recapData = this.route.snapshot.params;
    console.log(this.recapData);
  }

  homePage(): void {
    this.router.navigate(['/home']);
  }

  purchasedTrainings(): void {
    this.trainingsService.getPurchasedTrainings(this.recapData.userID, this.router);
  }
}
