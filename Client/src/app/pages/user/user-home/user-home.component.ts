import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../services";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  currentUser: any;
  index = 0;
  userNoti = new User();
  router: Router;
  constructor( private authService: AuthenticationService, private userService: UserService, router: Router) {
    this.router = router;
    console.log("constructor of User component");
        this.currentUser = authService.getCurrentUser();
        userService.setCurrentUser(this.currentUser);
        this.userService.postSubject.subscribe(e => {
          this.userNoti.notifications = [];
           this.getNotification();
      })
  }

  ngOnInit(): void {
    this.userService.getUserById(this.currentUser._id).pipe(first())
        .subscribe(user => {
          this.userService.setCurrentUser(user.result);
        });
    this.getNotification();
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

 countNoti() {
  if(!this.userNoti.notifications) {
    return 0;
  }
  else {
    return this.userNoti.notifications.length;
  }
 }
 getNotification() {
  this.userService.getUserById(this.userService.getCurrrentUser()._id).subscribe(response => {
    this.userNoti = (response.result);
    this.userNoti.notifications = this.userNoti.notifications.reverse();
    
});
}

searchPost(value) {
  console.log(this.router.url, "ROUTER");
    this.userService.searchFeeds(value).subscribe(result => {
      this.userService.searchSubject.next(result.result);
      // this.router.navigate(['/']);
    })
}

}
