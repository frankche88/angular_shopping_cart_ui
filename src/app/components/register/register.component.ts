import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { FormGroup, FormBuilder, FormControlName, FormControl, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validators/generic-validator';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageAlertHandleService } from 'src/app/shared/services/message-alert.service';
import { CustomValidators } from 'ng2-validation';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'ng2-ui-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  @BlockUI() blockUI: NgBlockUI;
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  displayMessage: { [key: string]: string } = {};
  mainForm: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder,
      private _router: Router, private _route: ActivatedRoute,
      private _authService: AuthService,
      private _messageAlertHandleService: MessageAlertHandleService) {

      this.validationMessages = {
        userName: {
          required: 'UserName is required.',
          minlength: 'UserName must be at least 3 characters.'
      },
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
          userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
          email: new FormControl('', [Validators.required, Validators.minLength(5), CustomValidators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(6)])

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

    if (this.mainForm.dirty && this.mainForm.valid) {
      this.blockUI.start();

      const signUpSubscription =  this._authService.signup(JSON.stringify(this.mainForm.value)).subscribe(
        (response) => {

            this._authService.setToken(response);
            this._messageAlertHandleService.handleSuccess('account was created successfully');
            this.mainForm.reset();
            this.blockUI.stop();
            this._router.navigate(['/home']);
        },
        error => {
          this._messageAlertHandleService.handleError(error.error.message);

          this.blockUI.stop();
        }
      );

      this.subscription.add(signUpSubscription);
    }
  }
}
