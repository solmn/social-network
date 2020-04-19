import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../../services";
import { Post, User } from "../../../../../models";
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  myFollowers = [];
  currentUser: User;
  constructor(private userService: UserService) { 
     
  }

  ngOnInit(): void {
        this.initFollowers();
        this.userService.followings.subscribe(r => {
          this.initFollowers();
        })
            // this.userService.getFollwings().pipe(first())
            // .subscribe(response => {
            //     console.log("MFFFFFOLLLOWINGS", response.result);
            // })
  }

  initFollowers() {
    this.userService.getFollowers().pipe(first())
            .subscribe(response => {
                this.myFollowers = response.result;
                this.currentUser = this.userService.getCurrrentUser();
            });
  }
  follow(id) {
    this.userService.follow(id).pipe(first())
        .subscribe(response => {
         const i = this.myFollowers.findIndex(user => user._id == id);
         const u = this.myFollowers[i];
         u.followers.push({"followerID": this.currentUser});
         this.currentUser.following.push({"followerID": id});
         this.myFollowers[i] = u;
         this.userService.followers.next();
         this.userService.followings.next();
        });
 }

  unfollow(id) {
    this.userService.unFollow(id).pipe(first())
        .subscribe(response => {
          const i = this.myFollowers.findIndex(user => user._id == id);
          const index = this.myFollowers[i].followers.findIndex(f => f.followerID == this.userService.getCurrrentUser()._id);
          if(index > -1) {
            this.myFollowers[i].followers.splice(index, 1);
          }
          const index2 = this.currentUser.following.findIndex(f => f.followerID == id);
          this.currentUser.following.splice(index2, 1);
    });
  }
  isFollwed(id) {
    return this.currentUser.following.findIndex(f => f.followerID == id) > -1;

  }
}