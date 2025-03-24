import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercardsComponent } from './usercards/usercards.component';
import { UsermaintenanceComponent } from './usermaintenance/usermaintenance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from "@ng-select/ng-select";
import { ListComponent } from './list/list.component';
import { ViewUserComponent  } from './view-user/view-user.component';
@NgModule({
  declarations: [   
    UsercardsComponent,
    UsermaintenanceComponent,
    ListComponent,
    ViewUserComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule    
  ]
})
export class UserModule { }