import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services';
import { AdminHomeComponent } from '../admin-home/admin-home.component';

@Component({
  selector: 'app-admin-post-review',
  templateUrl: './admin-post-review.component.html',
  styleUrls: ['./admin-post-review.component.scss']
})
export class AdminPostReviewComponent implements OnInit {
  adminNotifications:any;
  allBadPosts:any;
  constructor(
    private adminService:AdminService, 
    private userService: UserService) { 

    this.userService.adminBadPostSubject.subscribe(res => {
      this.getFlaggedPosts(); 
      console.log("BAD bad bad word posted",res);
      
    })
    
  }

  ngOnInit(): void {
    this.getFlaggedPosts();
  }
getFlaggedPosts(){
  this.adminService.getBadWordedPosts().pipe(first())
                   .subscribe(response=>{
                    this.allBadPosts = response.result.filter(r => r.post); 
                    console.log("GOT THE POSTS FETACHED........",this.allBadPosts)
  })
  
}
acceptBadPost(badPost,index){
    this.adminService.approvePost({notiId: badPost._id,postId: badPost.post._id })
                     .pipe(first())
                     .subscribe(response=>{
                      let index = this.allBadPosts.findIndex(b => b.post._id == badPost.post._id );
                      if(index !=-1) {
                        this.allBadPosts.splice(index, 1);
                      }
                      // this.getFlaggedPosts();
                      // //re-load all bad post words again
                     });
    
  }

rejectBadPost(badPost ,index){
  console.log(badPost, index);
    if(badPost.user.badPostCount+1>20){
      this.deactivateAccount(badPost.user._id, badPost.post._id, badPost._id);
    }
    else{
      this.adminService.rejectPost({notiId: badPost._id, userId:badPost.user._id, postId: badPost.post._id })
                     .pipe(first())
                     .subscribe(response=>{
                      let index = this.allBadPosts.findIndex(b => b.post._id == badPost.post._id );
                      if(index !=-1) {
                        this.allBadPosts.splice(index, 1);
                      }
                      //this.getFlaggedPosts();
                      });
  }
}

deactivateAccount(userId, postId, notiId){
  console.log("About to deactivated", userId)
  this.adminService.deactivateAccount({userId: userId, postId:postId, notiId})
          .pipe(first())
          .subscribe(response=>{
            let index = this.allBadPosts.findIndex(b => b.post._id == postId);
            if(index !=-1) {
              this.allBadPosts.splice(index, 1);
            }
                console.log("Account has deactivated");
            //deactivated account  
          })
}


}
