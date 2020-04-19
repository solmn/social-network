import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    currentUser: User;
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.currentUser = this.authService.getCurrentUser();
        if (this.authService.isUserAuthenticated()) {
            if(this.currentUser.status === "deactivated" || this.currentUser.status ==="requested") {
                
                this.authService.logout();
                this.router.navigate(['/activate-account']);
                console.log("DEACTIVATED");
            }
            // check if route is restricted by role
            if (route.data.role && route.data.role !== this.currentUser.role) {
                // role not authorised so redirect to home page
                
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
