import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  activationForm: FormGroup;
  loading= false;
  submitted = false;
  returnUrl: string;
  error = '';
  s = "";
  alert = "Your account has been deactivated due to inappropriate  activity. please send activation request to the adminstrator.";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  )
   {
   }

  ngOnInit() {
    this.activationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get loginF() {
    return this.activationForm.controls;
  }

  request() {
    console.log("submitted");
    // this.submitted = true;
    // // if (this.activationForm.invalid) return;
    // this.loading = true;

    this.authService.activateRequest(this.loginF.username.value, this.loginF.password.value)
        .pipe(first())
        .subscribe(
          data => {
           this.s = data.result.message;
            console.log(data, "AACTivaiton");
            // this.router.navigate([this.returnUrl]);
          },
          error => {
            console.log(error);
           this.alert = error.error.result.err;
            
            // this.alert = error.result.err;
            this.loading = false;
          }
        );
  }

}
