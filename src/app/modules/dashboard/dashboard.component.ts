import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../core/services/http.service';
import { ApiConfig } from '../../core/config/api-config';
import { AppUtil } from '../../core/config/app-util';
import { GlobalConst, DocType } from '../../core/config/app-enum';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    loading: boolean = false;
    msgs: any[] = [];
    growlLife: number = GlobalConst.growlLife;

    templateOption: any[] = [];
    selectedTemplate: string;

    constructor(private fb: FormBuilder, private router: Router, private service: HttpService) {
    }

    ngOnInit() {        
        this.getTemplates();
    }

    setDefault(): void{
    }

    getTemplates(): void{
        this.templateOption = [
            { label:'Select Templates & Guidelines', value:'' },
            { label: 'Template-1', value: 'Template1.csv' },
            { label: 'Template-2', value: 'Template1.csv' },
            { label: 'Guidelines', value: 'Instructions.xlsx' }
        ];
    }

    onDownload() {
        if (this.selectedTemplate) {
            let fileExt: string = this.selectedTemplate.split('.')[0];
            if (fileExt.toLowerCase() == DocType.csv) {
                this.service.getCsv(ApiConfig.templatePath + this.selectedTemplate).subscribe(data => {
                    AppUtil.downloadFile(data, this.selectedTemplate);
                }, error => { console.log(error) });
            }
            else {
                AppUtil.downloadStaticFile(ApiConfig.templatePath, this.selectedTemplate);
            }
        }
    }

}
