import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  public userName: string;
  public totalItems = 0;
  private subscription: Subscription = new Subscription();

  constructor(private _authService: AuthService, private _router: Router,
    private _shoppingCartService: ShoppingCartService,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    const numberItemsSubscription = this._shoppingCartService.getNumberItems()
      .subscribe(numberItem => {
        this.totalItems = numberItem.value;
        this._changeDetectorRef.detectChanges();
      });

    this.subscription.add(numberItemsSubscription);

  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  logOut(): void {

    const logOutSubscription = this._authService.logout().subscribe(
      () => {
        this._shoppingCartService.setNumberItems(0);
        this._router.navigateByUrl('home');
      },
      error => {

      }
    );

    this.subscription.add(logOutSubscription);
  }

  isAuthenticated(): boolean {

    return this._authService.isAuthenticated();
  }

  getUserName(): boolean {

    return (this._authService.getPayload() !== undefined) ?
      this.userName = this._authService.getPayload().sub : '';
  }
}
