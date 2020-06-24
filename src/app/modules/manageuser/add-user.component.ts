import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { GlobalConst } from '../../core/config/app-enum';
import { IManageUser } from '../../core/models/manageuser.model';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['manageuser.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AddUserComponent implements OnInit {

    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    appConfig:any;

    addUserForm:FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    /*async ngOnInit() {        
        this.addUserForm = this.fb.group({
            userName: ['', Validators.required],
            address:['', Validators.required],
            contactNo:['', Validators.required],
            email:['', [Validators.required, Validators.email]]
        });
        this.appConfig = await this.service.getAppConfig();
    }*/

    ngOnInit() {        
        this.addUserForm = this.fb.group({
            userName: ['', Validators.required],
            address:['', Validators.required],
            contactNo:['', Validators.required],
            email:['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.addUserForm.valid) {
            this.loading = true;
            let model: IManageUser = this.mapModel(this.addUserForm.value);
            //let url: any = this.appConfig.apiServer.devUrl + ApiConfig.createUserApi;
            this.service.post(ApiConfig.createUserApi, model)
                .subscribe(res => {
                    if (res.IsSuccess) {
                        this.showSuccess(res.ReturnMessage);
                        setTimeout(() => {
                            this.addUserForm.reset();
                        }, GlobalConst.growlLife);
                    }
                    else {
                        this.showError(res.ReturnMessage);
                    }
                    this.loading = false;
                }, err => {
                    this.showError("Internal server error");
                    this.loading = false;
                });
        }
    }

    mapModel(formData: any): IManageUser {
        return {
            Name: formData.userName ? formData.userName : '',
            EmailId: formData.email ? formData.email : '',
            Mobile: formData.contactNo ? formData.contactNo : '',
            Address: formData.address ? formData.address : '',
            IsActive: true
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
