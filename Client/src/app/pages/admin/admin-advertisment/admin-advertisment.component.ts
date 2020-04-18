import { Component, OnInit } from '@angular/core';
import { FileHolder, UploadMetadata } from 'angular2-image-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import {Advertisement, User} from '../../../models';
import { from } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services';



@Component({
  selector: 'app-admin-advertisment',
  templateUrl: './admin-advertisment.component.html',
  styleUrls: ['./admin-advertisment.component.scss']
})
export class AdminAdvertismentComponent implements OnInit {
  customStyle = {
    selectButton: {
      "background-color": "white",
      "border-radius": "25px",
      "color": "#000"
    },
    clearButton: {
      "background-color": "#FFF",
      "border-radius": "25px",
      "color": "#000",
      "margin-left": "10px"
    },
    layout: {
      "background-color": "white",
      "border-radius": "25px",
      "font-size": "15px",
      "margin": "2px",
      "padding-top": "5px",
      "width": "650px"
    },
    previewPanel: {
      "background-color": "#F1F7FC",
      "border-radius": "0 0 25px 25px",
    }
  }
  imageUrl:string; 
  advertisements: Advertisement;
  advertisementForm: FormGroup;
  advertisementEditForm: FormGroup;
  allAdvertisements:Array<Advertisement>
  loading = false;
  submitted = false;
  advertDetails:any;
  error = "";
  showNewAdPane = false;
  buttonName =['Show Advertisement Pane','Hide Advertisement Pane']; 
  nameIndex = 0;
  advertTextAreaStatus = true;



  constructor(
              private adminService:AdminService, 
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder ) { 

        this.advertisementForm = this.formBuilder.group({
          advertisementDescriptionTextArea:['',Validators.required],
          targetAgeCheckBox:[],
          minAge:['0'],
          maxAge:['100'],
          targetLocationCheckBox:[],
          location:['']
          
        });
        this.advertisementEditForm = this.formBuilder.group({
          editDescription:['sfasd'],
          editTargetAgeCheckBox:['asdf'],
          editMinAge:[''],
          editMaxAge:[''],
          editLocationCheckBox:[''],
          editLocation:['']

        });

    }
  ngOnInit(): void {
    this.adminService.getAllAdvertisements().pipe(first())
                     .subscribe(response =>{
                       if(response.status===500){
                        console.log(response.message);
                       }else{

                       }
                          this.allAdvertisements = response.result; 
                          console.log(this.allAdvertisements)
                      });
  }


  onUploadFinished(file: FileHolder) {
    this.imageUrl = file.serverResponse.response.body; 
    console.log(this.imageUrl);
  }


  onRemoved(file: FileHolder) {
  
    file
    console.log(file);
  }

  onCreateNewPost(){
      this.submitted = true;
     if(this.advertisementForm.invalid) return;
     this.advertDetails = this.advertisementForm.value;
     let newAdvertisement = new Advertisement();
     newAdvertisement.description = this.advertDetails.advertisementDescriptionTextArea;
     if(this.imageUrl===undefined){
       this.imageUrl ='';
     }
     newAdvertisement.imageUrl = this.imageUrl;
     newAdvertisement.postedBy =this.authenticationService.getCurrentUser()._id;
     newAdvertisement.minAge = this.advertDetails.minAge;
     newAdvertisement.maxAge = this.advertDetails.maxAge;
     newAdvertisement.targetLocation = this.advertDetails.location; 
console.log("ADVERTISEMENTS   TARGTE AGE.......",this.advertDetails.targetAgeCheckBox)
console.log("ADVERTISEMENTS   TARGTE LOCATION.......",this.advertDetails.targetLocationCheckBox)
     if(this.advertDetails.targetAgeCheckBox ===true&& this.advertDetails.targetLocationCheckBox ===true){
       newAdvertisement.targetType ='both';
  
    }else if(this.advertDetails.targetAgeCheckBox ===null&& this.advertDetails.targetLocationCheckBox===true){
        newAdvertisement.targetType ='location';
 
    }else if(this.advertDetails.targetAgeCheckBox ===true && this.advertDetails.targetLocationCheckBox===null){
        newAdvertisement.targetType ='age';

    }else{
      newAdvertisement.targetType ='all';

    }
     this.adminService.creatAdvertisement(newAdvertisement)
                      .pipe(first())
                      .subscribe(response=>{
                        if(response.status ===501){

                        }else{
                          this.allAdvertisements.push(response.result)

                        }
                      });

    }


    editAdvertisement(index){
      console.log('working.........')
      this.submitted = true;
     if(this.advertisementEditForm.invalid) return;
     this.advertDetails = this.advertisementEditForm.value;
     if(this.advertDetails.targetAgeCheckBox &&(this.advertDetails.minAge ==='' && this.advertDetails.maxAge==='')) return;
     else if(this.advertDetails.editLocationCheckBox && this.advertDetails.editLocation==='')return;
     let editedAdvertisement = this.allAdvertisements[index];
     editedAdvertisement.description = this.advertDetails.editDescription;
     editedAdvertisement.minAge = this.advertDetails.editMinAge;
     editedAdvertisement.maxAge = this.advertDetails.editMaxAge;
     editedAdvertisement.targetLocation= this.advertDetails.editLocation;
     this.adminService.editAdvertisement(editedAdvertisement, editedAdvertisement._id)
                      .pipe(first())
                      .subscribe(response=>{
                        if(response.status ===501){

                        }else{
                          this.allAdvertisements[index]=response.result;

                        }
                      });


    }


    /**
     * toggle advertisement pane
     */
    toggleAddPane(){
      if(!this.showNewAdPane){
        this.showNewAdPane = true;
        this.nameIndex =1;
      }
      else{
        this.showNewAdPane = false; 
        this.nameIndex = 0;
      }
   
    }

identifyTarget(){

}
    /**
     * EDIT ADVERTISEMENT
     */
    editThisAdvert(_id){
      this.advertTextAreaStatus = false;

    }
    deleteThisAdvert(i){
      this.adminService.deleteAdvertisement(this.allAdvertisements[i]).pipe(first())
                                                .subscribe(response=>{
                                                  if(response.status===500){
                                                  
                                                  }else{
                                                    this.allAdvertisements.splice(i,1);
                                                  }
                                                });
     
    }

}
