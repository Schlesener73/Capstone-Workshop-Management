import {Pipe} from '@angular/core';

@Pipe({name: 'string2ampm'})

export class String2ampmPipe {
    transform(input:string) : string {
        var timeString = input;
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? " am" : " pm";
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
    }
}