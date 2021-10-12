import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interface/heroes.interface';

// NOTE: make sure it's from environment and NOT from environment.prod
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {

    // base URL from environment.ts files
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    // GET heroes
    getHeroes(): Observable<Heroe[]> {
        return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)
    }

    // GET
    getHeroeById(id: string): Observable<Heroe> {
        return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
    }

    agregarHeroe(heroe: Heroe): Observable<Heroe> {
        return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe)
    }

    actualizarHeroe(heroe: Heroe): Observable<Heroe> {
        return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
    }

    borrarHeroe(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
    }

}
