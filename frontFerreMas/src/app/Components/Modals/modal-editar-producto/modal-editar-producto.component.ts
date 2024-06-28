import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductoService } from 'src/app/Core/producto.service';
import { ProductoModel } from 'src/app/Shared/producto.model';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-editar-producto',
  templateUrl: './modal-editar-producto.component.html',
  styleUrls: ['./modal-editar-producto.component.scss']
})
export class ModalEditarProductoComponent implements OnInit{

  productoAEditar: ProductoModel = new ProductoModel();

  constructor(
    private productoService: ProductoService,
    public modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.productoAEditar = JSON.parse(sessionStorage.getItem('producto')!);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  editarProducto():void{
    this.productoService.editarProducto(this.productoAEditar).subscribe({

      next: (response: ResponseModel) => {
        
        if(response.statusCode == 200){

          alert("Producto Actualizado!");
          this.modalService.setDismissReason(`editado${JSON.stringify(this.productoAEditar)}`);
          this.modalService.hide();
          
        }
        else{
          alert(response.message);
        }

      },
      error: (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }

    })
  }

}
