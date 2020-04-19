import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../services";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService,
    private authService: AuthenticationService
  ) {
     if (this.authService.isUserAuthenticated()) {
       this.router.navigate(["/"]);
     }

     this.signupForm = this.formBuilder.group({
        username:  ['', Validators.required],
        firstname: ['', Validators.required],
        lastname:  ['', Validators.required],
        birthdate: ['', Validators.required],
        location:  ['', Validators.required],
        email:     ['', Validators.required],
        password:  ['', Validators.required]
     });
  }

  getF() {
    return this.signupForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if(this.signupForm.invalid) return;

    this.loading = true;
    this.userService.signup(this.signupForm.value)
        .pipe(first())
        .subscribe(
          data => {
            if(data.status == 401) {
              this.error = data.message;
            }
            else {
              this.toastr.success('Successfully registered');
              this.router.navigate(['/login']);
            }
           
          },
          error => {
            if(error.error) {
              this.toastr.error(error.error.result.err, 'Error', {
                timeOut: 5000
              });
            }
            console.log(error);
            
            this.loading = false;
          }
        );


  }

  ngOnInit(): void {
  }

}
