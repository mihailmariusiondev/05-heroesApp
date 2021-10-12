import { Component } from '@angular/core';
import { Heroe, Publisher } from '../../interface/heroes.interface';

@Component({
    selector: 'app-agregar',
    templateUrl: './agregar.component.html',
    styles: [
    ]
})
export class AgregarComponent {

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
    ) { }


}
