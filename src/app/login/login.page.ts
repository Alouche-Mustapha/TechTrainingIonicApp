import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSignin } from '../Models/user.interface';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authenticationService = new AuthenticationService()
  user = new UserSignin();
  data : any;
  show : boolean

  constructor(private route : ActivatedRoute, public router : Router, public alertController : AlertController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.data = params      
      if (params['source'] == "detailsPage") {
        this.show = true
      } else if (params['source'] == "homePage") {
        this.show = false
      }
    })
  }

  reset(): void {
    this.router.navigate(['/reset-password']);
  }
  
  signUp(): void {
    this.router.navigate(['/register', this.data]);
  }

}
