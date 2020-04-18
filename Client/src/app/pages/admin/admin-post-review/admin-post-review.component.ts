import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-admin-post-review',
  templateUrl: './admin-post-review.component.html',
  styleUrls: ['./admin-post-review.component.scss']
})
export class AdminPostReviewComponent implements OnInit {
  adminNotifications:any
  allBadPosts:any
  constructor(private adminService:AdminService, private userService: UserService) { 
    this.allBadPosts = adminService.getBadWordPostData();
    this.userService.adminBadPostSubject.subscribe(res => {
      console.log("BAD bad bad word posted");
      
    })
  }

  ngOnInit(): void {
  }

  acceptBadPost(badPost,index){
    this.adminService.approvePost(badPost)
                     .pipe(first())
                     .subscribe(response=>{
                      this.allBadPosts[index] = response.result;
                     });
    
  }

  rejectBadPost(badPost ,index){
    this.adminService.rejectPost(badPost)
                     .pipe(first())
                     .subscribe(response=>{
                          this.allBadPosts[index] = response.result;
                  
                      });
  }






}
