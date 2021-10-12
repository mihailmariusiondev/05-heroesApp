import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirmar',
    templateUrl: './confirmar.component.html',
    styles: [
    ]
})
export class ConfirmarComponent implements OnInit {

    constructor(private dialogref: MatDialogRef<ConfirmarComponent>) { }

    ngOnInit(): void {
    }

    borrar() {
        this.dialogref.close(true)
    }

    cerrar() {
        this.dialogref.close()
    }
}
