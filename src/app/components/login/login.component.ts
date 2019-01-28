import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  hasError = false;
  errorText: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    this.authService.login(data.email, data.password)
      .then( () => this.router.navigate(['/']))
      .catch(error => {
        this.hasError = true;
        this.errorText = error.message;
      });
  }

  closeModal() {
    this.hasError = false;
  }

}
