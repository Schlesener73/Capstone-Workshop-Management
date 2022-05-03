import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(input:string) : string {
    var phoneString;
    phoneString = "(" + input.substring(0,3) + ") " + input.substring(3,6) + "-" + input.substring(6,10);
    return phoneString;
}

}
