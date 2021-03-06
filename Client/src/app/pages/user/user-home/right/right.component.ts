import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss']
})
export class RightComponent implements OnInit {
  userNoti = new User();
  ads: any;
  constructor(private authService: AuthenticationService,
     private userService: UserService,
     private router: Router) {

    // this.userService.postSubject.subscribe(e => {
    //     this.userNoti.notifications = [];
    //      this.getNotification();
    // })
   }  

  ngOnInit(): void {
    //  this.getNotification();
    this.userService.feetchAds().subscribe(result => {
       this.ads = result.result;
       console.log("ADSS", this.ads);
    });
  }

  getNotification() {
    this.userService.getUserById(this.userService.getCurrrentUser()._id).subscribe(response => {
      this.userNoti = (response.result);
      this.userNoti.notifications = this.userNoti.notifications.reverse();
 });
  }

}
