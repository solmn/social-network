import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userService: UserService) { 
    this.userService.connect();
    this.userService.adminBadPostSubject.subscribe(res => {
      console.log("POSTED");
    })
  }

  ngOnInit(): void {
  }

}
