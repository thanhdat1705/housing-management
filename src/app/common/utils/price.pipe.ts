import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(price: number | undefined) {
    return price ? String(price).replace(/(?!^)(?=(?:\d{3})+$)/g, ' ') : price;
  }
}
