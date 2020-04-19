import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading= false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  )
   {
       if(this.authService.isUserAuthenticated()) this.router.navigate(['/']);
   }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get loginF() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authService.login(this.loginF.username.value, this.loginF.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.toastr.success('Successfully logged in');
            this.router.navigate(['/']);
          },
          error => {
            this.toastr.error(error.error.result.err, 'Error', {
              timeOut: 5000
            });
            this.error = error;
            this.loading = false;
          }
        );
  }

}
