import { ResetService } from './../services/resetPassword/reset.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resteService = new ResetService()
  email : string
  
  constructor(public router : Router) { }

  ngOnInit() {}

  homePage(){
    this.router.navigate(['/home']);
  }
}
