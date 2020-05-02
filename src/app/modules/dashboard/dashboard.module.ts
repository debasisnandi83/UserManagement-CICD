import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/primeng';
import { MyDatePickerModule } from 'mydatepicker';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { LoaderModule } from '../../widgets/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule,
    LoaderModule,
    DropdownModule,
    MyDatePickerModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
