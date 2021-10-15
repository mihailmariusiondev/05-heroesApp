import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        // Si el observable de verificaAutenticacion() devuelve
        // false, NO existe el token en el localStorage (no está autenticado)
        // true, existe en el localStorage (está autenticado)
        return this.authService.verificaAutenticacion()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigate(['/auth/login'])
                    }
                })
            );
    }

    // Si el observable de verificaAutenticacion() devuelve
    // false, NO existe el token en el localStorage (no está autenticado)
    // true, existe en el localStorage (está autenticado)
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        // Si el observable de verificaAutenticacion() devuelve false, NO existe el token en el localStorage (no está autenticado), si devuelve true, existe en el localStorage
        return this.authService.verificaAutenticacion()
            .pipe(
                tap(estaAutenticado => {
                    // Si NO está autenticado, redirección a login
                    if (!estaAutenticado) {
                        this.router.navigate(['/auth/login'])
                    }
                })
            );
    }
}
