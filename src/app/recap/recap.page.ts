import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  }

  homePage() : void {
    this.router.navigate(['/home'])
  }

}
