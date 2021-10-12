import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interface/heroes.interface';

@Component({
    selector: 'app-confirmar',
    templateUrl: './confirmar.component.html',
    styles: [
    ]
})
export class ConfirmarComponent implements OnInit {

    constructor(
        private dialogref: MatDialogRef<ConfirmarComponent>,
        @Inject(MAT_DIALOG_DATA) public heroe: Heroe //aqui recibimos el heroe mediante un @inject
    ) { }

    ngOnInit(): void {
    }

    borrar() {
        this.dialogref.close(true)
    }

    cerrar() {
        this.dialogref.close()
    }
}
