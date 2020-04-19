import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { AdminService } from 'src/app/services/admin.service';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  public badWordPostSubject = new Subject<any>();


  constructor(
    private userService: UserService, 
    private adminService:AdminService) { 

    this.userService.connect();
    this.userService.adminBadPostSubject.subscribe(res => {
    console.log('notification......', res); 
    });
  }

  ngOnInit(): void {
  }


}
