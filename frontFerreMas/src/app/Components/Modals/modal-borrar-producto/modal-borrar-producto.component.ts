import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductoService } from 'src/app/Core/producto.service';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-borrar-producto',
  templateUrl: './modal-borrar-producto.component.html',
  styleUrls: ['./modal-borrar-producto.component.scss']
})
export class ModalBorrarProductoComponent {

  constructor(
    public modalService: BsModalService,
    private productoService: ProductoService
  ){}

  cerrarModal(){
    this.modalService.hide();
  }

  eliminarProducto(){

    const id: number = parseInt(sessionStorage.getItem("idEliminar")!);

    this.productoService.eliminarProducto(id).subscribe({

      next: (response: ResponseModel) => {
        if(response.statusCode == 200){

          alert("Se ha eliminado el producto!");
          this.modalService.setDismissReason(`eliminado${id}`);
          this.modalService.hide();
          
        }else{

          alert("No se pudo eliminar el producto");

        }
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo eliminar el producto");
      }

    });

  }

}
