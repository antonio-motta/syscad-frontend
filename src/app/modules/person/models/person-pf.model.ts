import { Address } from './address.model';
import { Phone } from './phone.model';

export class PersonPf {
    constructor(
        public id:string,
        public nome: string,
        public email: string,
        public birthday: string,
        public address: Array<Address> = [],
        public phones: Array<Phone> = []
    ){}
}