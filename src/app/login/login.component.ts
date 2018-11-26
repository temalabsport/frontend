import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login/auth.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../formres/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../formres/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    '../formres/vendor/animate/animate.css',
    '../formres/vendor/css-hamburgers/hamburgers.min.css',
    '../formres/vendor/select2/select2.min.css',
    '../formres/css/util.css',
    '../formres/css/main.css'
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required, ]  // Validators.minLength(8)
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /*if (this.loginForm.invalid) {
      return;
    }*/

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        resp => {
          this.router.navigate(['/home']);
          this.authenticationService.setSession(resp);
        },
        error => {
          this.loading = false;
          alert('Wrong e-mail or password!');
        }
      );
  }
}
