import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

    form: FormGroup;
    errors: string[] = [];
    messagePerErrorCode = {
       min: 'The minimum length is 10 characters',
        uppercase: 'At least one upper case character',
        digits: 'At least one numeric character',
        'err_usr': 'Could not create user'
    }

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

        this.form = this.fb.group({
            email: ['test@gmail.com', Validators.required],
            password: ['Password10', Validators.required],
            confirm: ['Password10', Validators.required]
        });
    }


    ngOnInit() {

    }


    signUp() {
        const val = this.form.value;

        if (val.email && val.password && val.password === val.confirm) {

            // debugger;
            this.authService.signUp(val.email, val.password)
                .subscribe(
                    // next
                    () => console.log('User created successfully'),

                    // error
                    (resp: HttpErrorResponse) =>  {
                        this.errors = resp.error && resp.error.errors || [resp.statusText];
                        console.log(`signup: this.errors - ${this.errors}`);
                    },
                    () => console.log('signUp: done.')
                );
        }

    }

}



