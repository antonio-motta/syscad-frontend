export class Address {
    constructor(
        public id: string,
        public street: string,
        public neighborhood: string,
        public cep: string,
        public city: string,
        public uf: string) { }
}