import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { GlobalConst } from '../../core/config/app-enum';
import { AppSession } from '../../core/config/app-session';
import { IUsers } from '../../core/models/menu.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    
    loginForm:FormGroup;
    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;
    
    constructor(private fb:FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email:['', [Validators.required, Validators.email]],
            password:['', [Validators.required]],
            rememberMe:['']
        });
    }

    ngAfterViewInit(){
    }

    ngOnDestroy(){
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            let formData: any = { email: this.loginForm.value.email, password: this.loginForm.value.password };
            let api: string = 'src/assets/metadata/userinfo.json';
            this.service.getConfig(api).subscribe(res => {
                let users: IUsers[] = res.result ? res.users : [];
                let user: IUsers = users.filter(x => x.userDetails.email == formData['email'] && x.userDetails.password == formData['password']).length > 0 ? users.filter(x => x.userDetails.email == formData['email'] && x.userDetails.password == formData['password'])[0] : null;
                if (user) {
                    AppSession.setSessionStorage("UserInfo", user.userDetails);
                    AppSession.setSessionStorage("UserMenu", user.menu);
                    this.router.navigateByUrl('dashboard');
                }
                else {
                    this.showError('User not exists!');
                }
                this.loading = false;
            }, error => {
                this.loading = false;
                console.log(error);
            });
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
