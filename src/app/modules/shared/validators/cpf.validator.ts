import { AbstractControl } from '@angular/forms';

export class CpfValidator {

    static validate(control: AbstractControl): {[key: string]: boolean} {
        if (this.cpfValid(control.value)) {
            return null;
        }
        return { 'cpf': true };
    }

    static cpfValid(cpf: any): boolean {
                
        cpf = !cpf || cpf.replace(/\D/g, '');
        let cpfsInvsRegex = /1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}/;
        
        if (!cpf || cpf.length !== 11 || cpfsInvsRegex.test(cpf)) {
            return false;
        } 
        
        let x = cpf.length - 1;
        let digTemp = 0;
        let e = 0;
        let h = '';
        
        for (let i = 0; i <= cpf.length - 3; i++) {
            digTemp = cpf.substring(i, i + 1);
            e = e + (digTemp * x);
            x -= 1;
            h = h + digTemp;
        }
        
        let dig = 11 - (e % 11);
        if (dig === 10 || dig === 11) {
            dig = 0;
        }

        let cpfSdigVer = cpf.substring(0, cpf.length - 2) + dig;
        x = 11;
        e = 0;
        for (let j = 0; j <= (cpf.length - 2); j++) {
            e += (cpfSdigVer.substring(j, j + 1) * x);
            x -= 1;
        }
        
        let digVer = 11 - (e % 11);
        if (digVer === 10 || digVer === 11) {
            digVer = 0;
        }
        
        return ((dig + '' + digVer) === cpf.substring(cpf.length, cpf.length - 2));
    }

}