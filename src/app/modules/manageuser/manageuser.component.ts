import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { GlobalConst } from '../../core/config/app-enum';
import { IManageUser, IUser } from '../../core/models/manageuser.model';

@Component({
    selector: 'app-manageuser',
    templateUrl: './manageuser.component.html',
    styleUrls: ['manageuser.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ManageUserComponent implements OnInit {

    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;

    userList: IUser[] = [];
    
    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {        
        let event: any= { index: 0 };
        this.onTabChange(event);
    }

    onTabChange(event: any) {
        if (event.index == 0) {
            this.getData();
        }
    }

    getData() {
        this.loading = true;
        this.userList = [];
        this.service.get(ApiConfig.getUsersApi).subscribe(res => {
            if(res && res.length > 0){
                this.userList = this.mapData(res);
            }
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
        });
    }

    mapData(rows: IManageUser[]): IUser[] {
        let dataList: IUser[] = [];
        rows.forEach(x => {
            let row: IUser = {
                id: x.Id,
                name: x.Name,
                emailId: x.EmailId,
                address: x.Address,
                contactNo: x.Mobile,
                active: x.IsActive ? 'Yes' : 'No',
                edit: false
            };
            dataList.push(row);
        });
        return dataList;
    }

    onRowEditInit(rowData: any, index: number) {
        rowData['edit']= true;
    }

    onRowEditCancel(rowData: any, index: number) {
        rowData['edit']= false;
    }

    onRowEditSave(rowData: any, index: number) {
        if (rowData) {
            let error: number = 0;
            if (error == 0) {
                this.loading = true;
                let model: any = this.mapModel(rowData);
                this.service.post(ApiConfig.updateUserApi, model).subscribe(res => {
                    if (res.IsSuccess) {
                        this.showSuccess(res.ReturnMessage);
                        rowData.edit = false;
                    }
                    else {
                        this.showError(res.ReturnMessage);
                    }
                    this.loading = false;
                }, err => {
                    this.showError("Internal server error.");
                    this.loading = false;
                });
            }
        }
    }

    mapModel(model: IUser): IManageUser {
        return {
            Id: model.id,
            Name: model.name ? model.name : '',
            EmailId: model.emailId ? model.emailId : '',
            Address: model.address ? model.address : '',
            Mobile: model.contactNo ? model.contactNo : '',
            IsActive: model.active == 'Yes' ? true : false
        };
    }

    showSuccess(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', detail: message });
    }

    showError(message: string) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', detail: message });
    }

}
