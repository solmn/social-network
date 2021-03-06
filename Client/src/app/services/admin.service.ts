import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Advertisement } from '../models';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../util';
import { UserService } from './user.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  allBadWordPosts:[];


  constructor(private http:HttpClient) {
   }

getBadWordPostData(){
  return this.allBadWordPosts; 
}


getBadWords(){
  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-bad-words');

}
updateBadWords(allBwords:Array<String>){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/update-bad-word',allBwords);

}
addBadWord(newBadword){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/add-bad-word',newBadword); 
}

getAllAdvertisements(){

  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-all-advertisements');
}
deleteAdvertisement(thisAdvert:Advertisement){

  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/delete-ad',thisAdvert);
}
creatAdvertisement(newAdvertisement:Advertisement){

  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/create-ad',newAdvertisement);
}
editAdvertisement(editedAd, id){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/edit-ad',{_id:id,edited:editedAd});
}
approvePost(data){  
    return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/approve-post',data);
}
rejectPost(data){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/reject-post',data);
}

getDeactivatedAccounts(){
  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-deactivated-account');
}

getBadWordedPosts(){
  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/get-badworded-posts');
}
adminPullNotifications(){
  return this.http.get<ApiResponse>(environment.API_URL+'/api/admin/pull-notifications');
}

deactivateAccount(data){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/deactivate-account', data);
}
activateAccount(accountId){
  return this.http.post<ApiResponse>(environment.API_URL+'/api/admin/activate-user-account',accountId);
}
accountActivateEmail(email) {
  return this.http.post<ApiResponse>(environment.API_URL + "/api/auth/activate-acc", {email: email});
}

}
