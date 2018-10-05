import {RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate} from '@angular/router';
import {AuthService} from 'ng2-ui-auth';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private _auth: AuthService, private _router: Router) {}
    canActivate(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {

        if (this._auth.isAuthenticated()) {
            return true;
        }

        this._router.navigate(['login'], { queryParams: { returnUrl: _state.url }});

        return false;
    }
}
