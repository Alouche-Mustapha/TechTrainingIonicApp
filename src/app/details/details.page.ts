import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  clickedTraining : any

  constructor(private route : ActivatedRoute, private router : Router, private location : Location) { 
  }

  ngOnInit(): void {  
    this.clickedTraining = this.route.snapshot.params
  }

  getStarted(){
    this.router.navigate(['/login'], {queryParams: {course: this.clickedTraining.name, price: this.clickedTraining.price, source : "detailsPage"}})
  }
  
  backPage(){
    this.location.back()
  }

}
