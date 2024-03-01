export class Product {
    constructor (
        public sku:string,
        public name:string,
        public description:string,
        public unitPrice:number,
        public imageUrl:string,
        public status:boolean,
        public unitInStock:number,
        public dateCreated:Date,
        public lastUpdate:Date,){}
}
