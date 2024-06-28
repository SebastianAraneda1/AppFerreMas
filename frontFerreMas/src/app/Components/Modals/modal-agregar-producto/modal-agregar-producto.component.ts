import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductoService } from 'src/app/Core/producto.service';
import { ProductoModel } from 'src/app/Shared/producto.model';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-agregar-producto',
  templateUrl: './modal-agregar-producto.component.html',
  styleUrls: ['./modal-agregar-producto.component.scss']
})
export class ModalAgregarProductoComponent{

  nuevoProducto: ProductoModel = new ProductoModel();

  constructor(
    private productoService: ProductoService,
    public modalService: BsModalService
  ){}

  cerrarModal(){
    this.modalService.hide();
  }

  agregarProducto(){

    this.productoService.agregarProducto(this.nuevoProducto).subscribe({

      next: (response: ResponseModel) => {

        if(response.statusCode == 200){

          alert('Producto agregado correctamente');

          this.modalService.setDismissReason(`creado${JSON.stringify(this.nuevoProducto)}`);
          this.modalService.hide();

        }
        else{

          alert(response.message);
          
        }

      },
      error: (err) => {
        alert("No se pudo agregar el producto");
        console.log(err);
      }

    })

  }
  
}
