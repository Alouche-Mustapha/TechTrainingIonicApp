import { Injectable } from '@angular/core';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Router } from '@angular/router';

import { auth } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor() { }

  resetPassword(email: string, router: Router) {
    sendPasswordResetEmail(auth, email)
    .then(() => alert('Please check your email verification link'))
    .catch(() => alert('Something went wrong'));
    router.navigate(['/home']);
  }
}
