import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interface/heroes.interface';

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

    transform(heroe: Heroe): string {

        if (!heroe.id && !heroe.alt_img) {
            // NO tiene id, default image
            return 'assets/no-image.png'
        } else if (heroe.alt_img) {

            // SI tiene alt.img, le colocamos su IMG de URL
            return heroe.alt_img;
        } else {

            // SI tiene id, le colocamos su IMG de /assets
            return `assets/heroes/${heroe.id}.jpg`;
        }

    }

}
