import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/Core/producto.service';
import { ClienteService } from 'src/app/Core/cliente.service';
import { ProductoModel } from 'src/app/Shared/producto.model';
import { ResponseModel } from 'src/app/Shared/response.model';
import { ClienteModel } from 'src/app/Shared/cliente.model';
import { BoletaModel } from 'src/app/Shared/boleta.model';
import { BoletaRequestModel } from 'src/app/Shared/boletaRequest.model';
import { BoletaService } from 'src/app/Core/boleta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  public listaProductos: Array<ProductoModel> = [];
  public listaClientes: Array<ClienteModel> = [];

  listaBoletas = new Array<BoletaModel>();

  public productoSeleccionado = new ProductoModel();
  public clienteSeleccionado = new ClienteModel();

  public cantidad!: number;
  public tipoEntrega = 0;

  public estado: string = "";

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private boletaService: BoletaService,
    private route: Router
  ){}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerProductos();
  }

  // OBTENER PRODUCTO SELECCIONADO
  seleccionarProducto(event: any){
    const id = parseInt(event.target.value);
    this.productoSeleccionado = this.listaProductos.find(producto => producto.id === id)!;
  }

  // OBTENER CLIENTE SELECCIONADO
  seleccionarCliente(event: any){

    const id = parseInt(event.target.value);
    this.clienteSeleccionado = this.listaClientes.find(cliente => cliente.id === id)!;

}

  // OBTENER LOS PRODUCTOS
  obtenerProductos(): void{

    this.productoService.obtenerProductos().subscribe({
      next: (response: ResponseModel) => {

        if(response.statusCode == 200){
            this.listaProductos = response.data;
        }
      
      },
      error: (error) => {
        console.log('Error al obtener los productos: ', error);
      }

    })
  }

  // OBTENER LOS CLIENTES
  obtenerClientes(): void{

    this.clienteService.obtenerClientes().subscribe({
      next: (response: ResponseModel) => {

        if(response.statusCode == 200){
          this.listaClientes = response.data;
        }

      },
      error: (error) => {
        console.log('Error al obtener los clientes: ', error);
      }

    })
  }

  // DESCONTAR STOCK
  descontarStock(): void{
    this.productoSeleccionado.cantidad = this.cantidad;
    this.productoService.descontarStock(this.productoSeleccionado).subscribe({

      next: (response: ResponseModel) => {

        if(response.statusCode == 200 && this.cantidad > 0){
          this.CrearBoleta();
          console.log('Se ha descontado ', this.cantidad, ' al siguiente producto: ', this.productoSeleccionado.nombre)
        }

      },
      error: (error) => {
        console.log('Error al descontar stock: ', error);
      }

    })
    
  }

  //******NAVEGAR A ADMINISTRACIÓN******
  goToAdminPage(){
    this.route.navigate(["/administracion"])
  }

  //********PARTE BOLETA***********


  // Crear Boleta
  CrearBoleta(){

    const boletaRequest = new BoletaRequestModel(
      this.clienteSeleccionado.id,
      this.productoSeleccionado.id,
      this.productoSeleccionado.cantidad,
      this.tipoEntrega
    );
    
    this.boletaService.crearBoleta(boletaRequest).subscribe({
      
      next:(boleta: BoletaModel) => {
        this.listaBoletas.push(boleta);
      },
      error:(error) => {
        console.log("Ha ocurrido el siguiente error: ", error)
      }

    });

  }

  // Eliminar boletas
  eliminarBoleta(idBoleta: number) {
    const indice = this.listaBoletas.findIndex(boleta => boleta.id === idBoleta);
    if (indice !== -1) {
      this.listaBoletas.splice(indice, 1);
    }
  }

}
