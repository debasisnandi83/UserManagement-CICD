import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  GrowlModule, AccordionModule, DropdownModule, MessagesModule, TooltipModule, 
  TabViewModule, ConfirmDialogModule, ButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { MyDatePickerModule } from 'mydatepicker';

import { ManageUserRoutingModule } from './manageuser-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoaderModule } from '../../widgets/spinner/spinner.module';

import { ManageUserComponent } from './manageuser.component';
import { AddUserComponent } from './add-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageUserRoutingModule,
    SharedModule,
    LoaderModule,
    DropdownModule,
    MyDatePickerModule,
    GrowlModule,
    AccordionModule,
    MessagesModule,
    TooltipModule,
    TabViewModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    ManageUserComponent,
    AddUserComponent
  ]
})
export class ManageUserModule { }
