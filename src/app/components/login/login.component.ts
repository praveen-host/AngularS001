import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../shared/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            
            username: [''],
            password: ['']
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f['username'].value, this.f['password'].value)
            .subscribe({
                next: (res) => { 
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('userInfo',JSON.stringify(res));
                    this.router.navigate([this.returnUrl]);
                },
                error: (error) => {
                    this.loading = false;
                    console.log(error);
                }
            });
    }

}
