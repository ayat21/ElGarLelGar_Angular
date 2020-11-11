import { Injectable } from '@angular/core';
// tslint:disable-next-line: import-spacing
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } 
from '@angular/router';

import { LayoutService } from '../services/layout.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: LayoutService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser);

        if (currentUser) {
            console.log(currentUser);
            // check if route is restricted by Role
            if (route.data.Roles && route.data.Roles.indexOf(currentUser.Role) === -1) {
                console.log(currentUser.Role);
                // Role not authorised so redirect to home page
                this.router.navigate(['/index']);
                return false;
            }

            // authorised so return true
          //this.router.navigate(['/index'] );

            return true;
        }

        this.router.navigate(['/login'] , { queryParams: { returnUrl: _state.url } });
        return false;
    }
}