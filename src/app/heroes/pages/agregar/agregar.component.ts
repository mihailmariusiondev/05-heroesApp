import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    styleUrls: ['./agregar.component.css']

})
export class AgregarComponent implements OnInit {

    publishers = [
        {
            id: 'DC Comics',
            desc: 'DC - Comics'
        },
        {
            id: 'Marvel Comics',
            desc: 'Marvel - Comics'
        },
    ];

    heroe: Heroe = {
        superhero: '',
        alter_ego: '',
        characters: '',
        first_appearance: '',
        publisher: Publisher.DCComics,
        alt_img: '',
    }

    constructor(
        private heroesService: HeroesService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {

        // Si estamos CREANDO uno nuevo, NO necesito traerme nada del back
        if (!this.router.url.includes('editar')) return

        // Si estamos EDITANDO, le relleno los datos con lo que me traiga del back
        this.activatedRoute.params
            .pipe(
                switchMap(({ id }) => this.heroesService.getHeroeById(id))
            )
            .subscribe(heroe => this.heroe = heroe)

    }

    guardar() {

        if (this.heroe.superhero.trim().length === 0) return

        if (this.heroe.id) {
            // Actualizar
            this.heroesService.actualizarHeroe(this.heroe)
                .subscribe(
                    heroe => console.log("actualizando", heroe)
                )

        } else {
            // Crear
            this.heroesService.agregarHeroe(this.heroe)
                .subscribe(heroe => {
                    // Una vez creado, navegamos a la pantalla de editar
                    this.router.navigate(['/heroes/editar', heroe.id])
                })
        }

    }

}
