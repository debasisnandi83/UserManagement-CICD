import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { GlobalConst } from '../../core/config/app-enum';
import { IManageUser } from '../../core/models/manageuser.model';

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

    userList: IManageUser[] = [];
    
    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {        
        let event: any= { index: 0 };
        this.onTabChange(event);
    }

    onTabChange(event: any) {
        if (event.index == 0) {
            //this.getData();
        }
    }

    getData() {
        this.loading = true;
        this.userList = [];
        this.service.get(ApiConfig.getUsersApi).subscribe(res => {
            this.userList = res.result ? res.results : [];
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log(error);
        });
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
                this.service.put(ApiConfig.updateUserApi, rowData).subscribe(res => {
                    if (res.result) {
                        this.showSuccess(res.message);
                        rowData.edit = false;
                    }
                    else {
                        this.showError(res.message);
                    }
                    this.loading = false;
                }, err => {
                    this.showError("Internal server error.");
                    this.loading = false;
                });
            }
        }
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
