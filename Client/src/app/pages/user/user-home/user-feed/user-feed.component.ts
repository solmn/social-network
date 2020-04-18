import { Component, OnInit , ViewChild, HostListener } from '@angular/core';
import { AuthenticationService, UserService } from "../../../../services";
import { Post, User } from "../../../../models";
import { tick } from '@angular/core/testing';
import  { environment } from '../../../../../environments/environment';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {
  loading = false;
  index = 0;
  currentUser: User;
  post_status: boolean = false;
  post_message: "";
  post: Post = new Post();
  API_URL: string = environment.API_URL;
  IMG_UPLOD_URL = this.API_URL + "/api/uploads/profile-image";
  customStyle = {
    selectButton: {
      // "background-color": "yellow",
      // "background-image":"url(assets/img/pic.png)",
      "border-radius": "10px",
      "z-index": "10",
      "opacity": "1",
      "color": "#000",
      "font-size": "7px"
    },
    clearButton: {
      "background-color": "#FFF",
      "border-radius": "25px",
      "color": "#000",
      "margin-left": "10px",
      "opacity": "1",
    },
    layout: {
      // "background-color": "yello",
      "border-radius": "0px",
      "color": "#FFF",
      "font-size": "15px",
      "margin": "0px",
      // "padding-top": "5px",
      "width": "500px"
    },
    previewPanel: {
      "background-color": "white",
      "border-radius": "0 0 25px 25px",
    }
  }
  feeds = [];
  page = 1;
  end = false;
  constructor(private userService: UserService) {
    console.log("constructor of Feed component", this.IMG_UPLOD_URL);

  }

  ngOnInit(): void {
    this.initPost();
     this.fetchPostFeeds();
      this.currentUser = this.userService.getCurrrentUser();
     this.userService.postSubject.subscribe(re => {
       this.fetchPostFeeds();
       this.end = false;
     });
     this.userService.searchSubject.subscribe(result => {
       this.feeds = result;
     });
  }
  
@HostListener("window:scroll", [])
onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreFeeds();
    }

}

  loadMoreFeeds() {
    if(!this.end) {
      console.log("Loading more feeds");
      this.loading = true;
       this.page +=1;
       this.userService.fetchFeed(this.page).pipe(first())
            .subscribe(respose => {
              console.log("wowowowow",respose.result, "====>>>>")
              this.loading = false;
              if(respose.result.size > 0) {
                this.feeds = this.feeds.concat(respose.result);
                console.log("MORE FEED", respose.result);
              }
              if(respose.result.length < 7) {
                this.end = true;
              }else {
                this.end = false;
              }
              console.log(this.end, respose.result.length)
              
              
            }, err => {
              console.log(err);
            })
    }
    
  }

  fetchPostFeeds() {
    this.loading = true;
    this.userService.fetchFeed().pipe(first())
    .subscribe(respose => {
      this.loading = true;
      this.feeds = respose.result;
      console.log("WOOOW my feeds", respose.result);
    }, err => {
      console.log(err);
    })
  }

  onUploadFinished(file: FileHolder) {
    this.post.images.push(this.API_URL + "/"+file.serverResponse.response.body); 
  }

  createPost(){
    this.userService.createPost(this.post).pipe(first())
         .subscribe(response => {
           if(response.status === 200) {
             this.post_status = true;
           }
           this.post.postedBy = this.userService.getCurrrentUser();
           this.post.createdAt = Date.now();
           this.post.likes = [];
           this.post.comments = [];
           this.feeds.unshift(response.result);
         })
    console.log("NEW", this.post);

  }

  initPost(){
    console.log("FEED",this.userService.getCurrrentUser());
    this.post.postedBy = this.userService.getCurrrentUser()._id;
  }

  comment(text, id) {
    this.userService.addComment(id, text)
        .subscribe(respose => {
          console.log("COMMENT RESPONSE", respose);
          let i = this.feeds.findIndex(f => f._id == id);
          // let c = {
          //   text: text,
          //   commentedBy: this.userService.getCurrrentUser(),
          //   createdAt: Date.now()
          // };
          this.userService.getPost(id).subscribe(result => {
            this.feeds[i] = result.result;
          })
          // this.feeds[i].comments.push(c);
        })
  }
 isLiked(id) {
  let index = this.feeds.findIndex(f => f._id == id);
  if(index < 0 || !this.feeds[index].likes) {
    return "black";
  }
  let l_index = this.feeds[index].likes.findIndex(l => l.likedBy == this.userService.getCurrrentUser()._id);
  return l_index > -1 ? "blue": "black";
  
 }

  like(id) {
    let index = this.feeds.findIndex(f => f._id == id);
    let l_index = this.feeds[index].likes.findIndex(l => l.likedBy == this.userService.getCurrrentUser()._id);
    if(l_index > -1) {
      // unlike
      console.log("UNLIKE")
       console.log(index, l_index, "INDEX");
       this.userService.unLikePost(id).subscribe(response => {
           this.feeds[index].likes.splice(l_index, 1);
       })
    }
    else {
      console.log("LIKE")
      this.userService.likePost(id).subscribe(response => {
        let i = this.feeds.findIndex(f => f._id == id);
        let l = {
          likedBy: this.userService.getCurrrentUser()._id,
        };
        this.feeds[i].likes.push(l);
      });
    }
    
  }

  deleteComment(postId, commentId) {
      this.userService.deleteComment({postId:postId, commentId: commentId}).subscribe(re => {
        console.log("deleted");
        let i = this.feeds.findIndex(p => p._id == postId);
        if(i > -1) {
          let c_i = this.feeds[i].comments.findIndex(c =>c._id == commentId);
          if(c_i > -1){
             this.feeds[i].comments.splice(c_i, 1);
          }
          console.log(postId, commentId, i, c_i);
        }
      });
    
  }

  





}
