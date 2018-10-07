import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GenericValidator } from '../../shared/validators/generic-validator';
import { Subscription, Observable, fromEvent, merge } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { MessageAlertHandleService } from '../../shared/services/message-alert.service';
import { CustomValidators } from 'ng2-validation';
import { debounceTime } from 'rxjs/operators';
import { ShoppingCart } from '../../models/shopping-cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] = [];
  displayMessage: { [key: string]: string } = {};
  mainForm: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };
  genericValidator: GenericValidator;
  subscription: Subscription = new Subscription();
  total: number;
  order: Order;

  constructor(private fb: FormBuilder,
    private _shoppingCartService: ShoppingCartService,
    private _messageAlertHandleService: MessageAlertHandleService,
    private _orderService: OrderService,
    private _router: Router) {

    this.validationMessages = {
      firstName: {
        required: 'Fist Name is required.',
        minlength: 'Fist Name must be at least 2 characters.'
      },
      lastName: {
        required: 'Last Name is required.',
        minlength: 'Last Name must be at least 2 characters.'
      },
      address: {
        required: 'Address is required.',
        minlength: 'Address must be at least 2 characters.'
      },
      creditCardNumber: {
        required: 'Credit Card Number is required.',
        digits: 'Please enter a valid Credit Card Number.',
        rangeLength: 'Credit Card Number must have 16 numbers.'
      },
      creditCardAuthCode: {
        required: 'Credit Card Auth Code is required.',
        digits: 'Please enter a valid Credit Card Auth Code.',
        rangeLength: 'Credit Card Auth Code must have 3 numbers.'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.setUpFormControls();

    this.getShoppingCart();

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

  setUpFormControls(): void {

    this.order = new Order();
    this.order.orderItems = [];

    this.mainForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      address: new FormControl('', [Validators.required, Validators.minLength(2)]),
      creditCardNumber: new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([16, 16])]),
      creditCardAuthCode: new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([3, 3])])
    });
  }

  getShoppingCart() {

    const getSubscription = this._shoppingCartService.getShoppingCart().subscribe(

      (response: ShoppingCart) => {

        this.total = response.total;

        this.order.orderItems = response.items.map(o => {
          return  new OrderItem (o.productId, o.productName,  o.pictureUrl,
                                 o.unit, o.unitPrice , o.currency, o. total);});
    
        this._shoppingCartService.setNumberItems(this.order.orderItems.length);
      },
      (error: any) => {
      });

    this.subscription.add(getSubscription);
  }

  save(){

    if (this.mainForm.valid) {

      this.order  = Object.assign({}, this.order, this.mainForm.value);

      const submitSubscription = this._orderService.save(this.order, 0).subscribe(

        (response: any) => {
  
          this._messageAlertHandleService.handleSuccess('order was completed succesfully');
          this._router.navigateByUrl(`/`);
        },
        (error: any) => {
        
        });
  
      this.subscription.add(submitSubscription);

    }
  }
}
