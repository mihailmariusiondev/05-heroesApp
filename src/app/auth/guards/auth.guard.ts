import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // If we have user id, that means he's logged in
        if (this.authService.auth.id) {
            console.log("canActivate() ACCESO PERMITIDO por el AuthGuard");

            return true;
        }

        console.log("canActivate() BLOQUEADO por el AuthGuard");
        return false;
    }

    // SOLO SIRVE PARA PREVENIR QUE EL USUARIO CARGUE EL MODULO
    // SI YA ESTABA PREVIAMENTE CARGADO EL MODULO, LA PERSONA VA A PODER ENTRAR
    // canLoad() SOLO RESTRINGE SI PUEDE CARGAR EL MODULO
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

        // If we have user id, that means he's logged in
        if (this.authService.auth.id) {
            console.log("canLoad() ACCESO PERMITIDO por el AuthGuard");

            return true;
        }

        console.log("canLoad() BLOQUEADO por el AuthGuard");

        return false;
    }
}
