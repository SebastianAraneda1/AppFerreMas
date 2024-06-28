import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/Core/cliente.service';
import { ProductoService } from 'src/app/Core/producto.service';
import { ClienteModel } from 'src/app/Shared/cliente.model';
import { ProductoModel } from 'src/app/Shared/producto.model';
import { ResponseModel } from 'src/app/Shared/response.model';
import { ModalEliminarComponent } from '../ModalsClientes/modal-eliminar/modal-eliminar.component';
import { ModalAgregarProductoComponent } from '../Modals/modal-agregar-producto/modal-agregar-producto.component';
import { ModalEditarProductoComponent } from '../Modals/modal-editar-producto/modal-editar-producto.component';
import { ModalEditarComponent } from '../ModalsClientes/modal-editar/modal-editar.component';
import { ModalBorrarProductoComponent } from '../Modals/modal-borrar-producto/modal-borrar-producto.component';
import { ModalAnadirClienteComponent } from '../ModalsClientes/modal-anadir-cliente/modal-anadir-cliente.component';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  public listaProductos: Array<ProductoModel> = [];
  public listaClientes: Array<ClienteModel> = [];

  public productoSeleccionado = new ProductoModel();
  public clienteSeleccionado = new ClienteModel();

  modalRef!: BsModalRef;

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    public modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerProductos();
  }

  //------------PRODUCTOS--------------

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

  // EDITAR PRODUCTO
  editarProducto(producto: ProductoModel){

    sessionStorage.setItem("producto", JSON.stringify(producto));
    this.modalRef = this.modalService.show(ModalBorrarProductoComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) => {
      if(reason.includes('editado')){

        const productoEditado: ProductoModel = JSON.parse(reason.replace('editado', ''));

        this.listaProductos = this.listaProductos.map(producto => {

          if(producto.id === productoEditado.id){

            return productoEditado;

          }
          else{
            return producto;
          }

        });

      }

    });

  }

  // ELIMINAR PRODUCTO
  eliminarProducto(id: number){

    sessionStorage.setItem("idEliminar", JSON.stringify(id));
    this.modalRef = this.modalService.show(ModalEliminarComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) =>{

      if(reason.includes('eliminado')){

        const id = parseInt(reason.replace('eliminado', ''));
        let index = this.listaProductos.findIndex(producto => producto.id === id);

        if(index !== -1){

          this.listaProductos.splice(index, 1);

        }

      }

    });

  }

  // AGREGAR PRODUCTO
  agregarProducto(){
    
    this.modalRef = this.modalService.show(ModalAgregarProductoComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) => {

      if(reason.includes('creado')){

        const productoCreado: ProductoModel = JSON.parse(reason.replace('creado', ''));

        this.listaProductos.push(productoCreado);

      }

    })

  }

  //-------------CLIENTES-----------

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

  // EDITAR CLIENTE
  editarCliente(cliente: ClienteModel){

    sessionStorage.setItem("cliente", JSON.stringify(cliente));
    this.modalRef = this.modalService.show(ModalEditarComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) => {
      if(reason.includes('editado')){

        const clienteEditado: ClienteModel = JSON.parse(reason.replace('editado', ''));

        this.listaClientes = this.listaClientes.map(cliente => {

          if(cliente.id === clienteEditado.id){

            return clienteEditado;

          }
          else{
            return cliente;
          }

        });

      }

    });

  }

  // ELIMINAR CLIENTE
  eliminarCliente(id: number){

    sessionStorage.setItem("idEliminar", JSON.stringify(id));
    this.modalRef = this.modalService.show(ModalEliminarComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) =>{

      if(reason.includes('eliminado')){

        const id = parseInt(reason.replace('eliminado', ''));
        let index = this.listaClientes.findIndex(cliente => cliente.id === id);

        if(index !== -1){

          this.listaClientes.splice(index, 1);

        }

      }

    });

  }

  // AGREGAR CLIENTE
  agregarCliente(){
  
    this.modalRef = this.modalService.show(ModalAnadirClienteComponent);

    this.modalRef.onHidden!.subscribe((reason: string | any) => {

      if(reason.includes('creado')){

        const clienteCreado: ClienteModel = JSON.parse(reason.replace('creado', ''));

        this.listaClientes.push(clienteCreado);

      }

    })

  }

}
