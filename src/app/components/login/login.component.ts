import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Subscription } from 'rxjs';
import { GenericValidator } from '../../shared/validators/generic-validator';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef })
    formInputElements: ElementRef[] = [];
    displayMessage: { [key: string]: string } = {};
    mainForm: FormGroup;
    validationMessages: { [key: string]: { [key: string]: string } };
    genericValidator: GenericValidator;
    subscription: Subscription = new Subscription();

    constructor(private fb: FormBuilder, private _authService: AuthService,
        private _router: Router) {

        this.validationMessages = {
            email: {
                required: 'email is required.',
                minlength: 'email must be at least 5 characters.'
            },
            password: {
                required: 'Password is required.',
                minlength: 'Password must be at least 5 characters.'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        this.mainForm = this.fb.group({
            email: new FormControl('', [ Validators.required, Validators.minLength(5)]),
            password: new FormControl('', [ Validators.required, Validators.minLength(5)])

        });
    }

    ngAfterViewInit(): void {

        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        const controlSubscription = merge(this.mainForm.valueChanges, ...controlBlurs).pipe(debounceTime(800)).subscribe(() => {
            this.displayMessage = this.genericValidator.processMessages(this.mainForm);
        });

        this.subscription.add(controlSubscription);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    signUp(): void {

        const authLoginSubscription = this._authService.login(JSON.stringify(this.mainForm.value)).subscribe({
            error: (err: any) => {
            },
            complete: () => {
                this._router.navigateByUrl('home');
            }
        });

        this.subscription.add(authLoginSubscription);

    }
}
