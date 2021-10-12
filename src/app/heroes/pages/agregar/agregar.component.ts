import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
        private router: Router,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
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
                    heroe => {
                        this.mostrarSnackbar("Registro actualizado")
                    }
                )

        } else {
            // Crear
            this.heroesService.agregarHeroe(this.heroe)
                .subscribe(heroe => {
                    this.mostrarSnackbar("Registro creado")
                    // Una vez creado, navegamos a la pantalla de editar
                    this.router.navigate(['/heroes/editar', heroe.id])
                })
        }

    }

    borrarHeroe() {

        const dialog = this.dialog.open(ConfirmarComponent, {
            width: "250px",
            data: this.heroe            // LE MANDAMOS EL OBJETO DEL HEROE EN EL DIALOGO
            // data: {...this.heroe}    // readonly
        })

        // TODO make it switchmap instead of multiple observables
        dialog.afterClosed()
            .subscribe(
                // get result from dialog
                // (confirmar.component.ts metodo borrar manda un true, metodo cerrar manda undefined)
                (result) => {
                    if (result) {
                        this.heroesService.borrarHeroe(this.heroe.id!)
                            .subscribe(resp => {
                                this.router.navigate(['/heroes'])
                            })
                    }
                }
            )

    }

    mostrarSnackbar(mensaje: string) {
        this.snackBar.open(mensaje, "Ok!", {
            duration: 2500
        })
    }

}
