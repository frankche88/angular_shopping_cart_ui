import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  public userName: string;
  private subscription: Subscription = new Subscription();

  constructor(private _authService: AuthService, private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    if (this._authService.getPayload() !== undefined) {

      this.userName = this._authService.getPayload().sub;
    }
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();
  }

  logOut(): void {

    const logOutSubscription = this._authService.logout().subscribe(
      () => {
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

}
