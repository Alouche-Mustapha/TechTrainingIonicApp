import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserSignup } from './../Models/user.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  authenticationService = new AuthenticationService()
  user = new UserSignup()
  data : any
  password : string
  confirmPassword : string
  checked : boolean

  constructor(private route : ActivatedRoute, public router : Router) { }

  ngOnInit() {
      this.data = this.route.snapshot.params
      this.checked = false
  }
}