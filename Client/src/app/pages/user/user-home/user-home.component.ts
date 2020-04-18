import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../services";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  currentUser: any;
  index = 0;
  constructor( private authService: AuthenticationService, private userService: UserService, private router: Router) {
    console.log("constructor of User component");
        this.currentUser = authService.getCurrentUser();
        userService.setCurrentUser(this.currentUser);
  }

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser._id).pipe(first())
        .subscribe(user => {
          this.userService.setCurrentUser(user.result);
        });
    this.userService.connect();
  }
  setIndex(i) {
    this.index = i;
    console.log(i);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
 }

}
