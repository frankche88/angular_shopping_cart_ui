import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, FormControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { Subscription } from 'rxjs';
import { GenericValidator } from '../../shared/validators/generic-validator';
import { AuthService } from 'ng2-ui-auth';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { CustomValidators } from 'ng2-validation';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageAlertHandleService } from '../../shared/services/message-alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    @BlockUI() blockUI: NgBlockUI;
    @ViewChildren(FormControlName, { read: ElementRef })
    formInputElements: ElementRef[] = [];
    displayMessage: { [key: string]: string } = {};
    mainForm: FormGroup;
    validationMessages: { [key: string]: { [key: string]: string } };
    genericValidator: GenericValidator;
    subscription: Subscription = new Subscription();
    returnUrl: string;

    constructor(private fb: FormBuilder, private _authService: AuthService,
        private _router: Router, private _route: ActivatedRoute,
        private _shoppingCartService: ShoppingCartService,
        private _messageAlertHandleService: MessageAlertHandleService) {

        this.validationMessages = {
            email: {
                required: 'Email is required.',
                minlength: 'Email must be at least 5 characters.',
                email: 'Please enter a valid email address.'
            },
            password: {
                required: 'Password is required.',
                minlength: 'Password must be at least 6 characters.'
            }
        };

        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {

        this.mainForm = this.fb.group({
            email: new FormControl('member@test.com', [Validators.required, Validators.minLength(5), CustomValidators.email]),
            password: new FormControl('P@$$w0rd', [Validators.required, Validators.minLength(6)])

        });

        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
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

    signIn(): void {
        this.blockUI.start();
        const authLoginSubscription = this._authService.login(JSON.stringify(this.mainForm.value)).subscribe({
            error: (response: any) => {
                this.blockUI.stop();
                this._messageAlertHandleService.handleError(response.error);
            },
            complete: () => {
                this.blockUI.stop();
                this.clearBasket();

            }
        });

        this.subscription.add(authLoginSubscription);

    }


    clearBasket(): void {

        const modelclearSubscription = this._shoppingCartService.deleteShoppingCart().subscribe(
            (response: any) => {

                this._router.navigateByUrl(this.returnUrl);
            },
            (error: any) => {

            }
        );

        this.subscription.add(modelclearSubscription);

    }
}
