export class BoletaRequestModel {

    constructor(
        public id_cliente: number,
        public id_producto: number,
        public cantidad: number,
        public tipoEntrega: number
    ) {}

}