import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../../_services';
import { LoginType, LoginPayload, ApiResponse, User } from '../../_models';
import { UtilsService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    isLoggedIn: Observable<boolean>;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    invalidLogin = false;
    returnUrl: string;
    loginType: LoginType = LoginType.EMAIL;
    success = false;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private utilsService: UtilsService,
    ) {
        this.isLoggedIn = authService.isLoggedIn();
        this.isLoggedIn.subscribe(success => {
            // redirect to home if already logged in
            if (success) {
                this.router.navigate(['/']);
            } else {
            }
        });
    }

    ngOnInit() {
        this.createForm();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.onLoggin();
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.minLength(11)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            console.log('this.loginForm.invalid');
            return;
        }
        this.loading = true;

        const loginPayload: LoginPayload = {
            email: this.f.email.value,
            phone: this.f.phone.value,
            password: this.f.password.value,
            type: this.loginType,
        };

        // console.log('LoginComponent', loginPayload);

        return this.authService.login(loginPayload)
            .pipe(first())
            .subscribe(
                data => this.onLoggin(data),
                error => this.onErrorLoggin(error));
    }

    onLoggin(data: ApiResponse) {
        console.log('Inside onLoggin()...', data);
        if (data.success) {
            this.success = true;
            this.user = data.payload.user;
            this.router.navigate(['/dashboard'])
            // this.router.navigate([this.returnUrl])
            .then(nav => { console.log(nav); },
                err => { console.log(err); });
            console.log('\n\nNav to dashboard or ', this.returnUrl);
            return;
        } else {
            console.log('Token not found!');
            return;
        }
    }

    onErrorLoggin(error) {
        console.error(error);
        this.invalidLogin = true;
        this.loading = false;
        return;
    }
}
