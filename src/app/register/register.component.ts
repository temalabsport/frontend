import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '../formres/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../formres/fonts/Linearicons-Free-v1.0.0/icon-font.min.css',
    '../formres/vendor/animate/animate.css',
    '../formres/vendor/css-hamburgers/hamburgers.min.css',
    '../formres/vendor/select2/select2.min.css',
    '../formres/css/util.css',
    '../formres/css/main.css'
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      fullname: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    /*if (this.registerForm.invalid) {
            return;
        }*/

    this.loading = true;
    this.authenticationService
      .register(this.f.username.value, this.f.email.value, this.f.password.value, this.f.fullname.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
