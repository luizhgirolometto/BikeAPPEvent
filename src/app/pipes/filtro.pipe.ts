import { Product } from './../interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( produtos: Product[], texto: string ): Product[] {

    if ( texto.length === 0 ) { return produtos; }

    texto = texto.toLocaleLowerCase();
    console.log(texto);
    return produtos.filter( produto => {
      return produto.name.toLocaleLowerCase().includes(texto)
             || produto.description.toLocaleLowerCase().includes(texto)
             || produto.nameUser.toLocaleLowerCase().includes(texto)
             || produto.modalidade.toLocaleLowerCase().includes(texto)
             || produto.cities.toLocaleLowerCase().includes(texto)
             || produto.dtEvent.toLocaleLowerCase().includes(texto);

    });

  }

}
