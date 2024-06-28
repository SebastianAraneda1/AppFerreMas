import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/Core/cliente.service';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.scss']
})
export class ModalEliminarComponent {

  constructor(
    public modalService: BsModalService,
    private clienteService: ClienteService
  ){}

  cerrarModal(){
    this.modalService.hide();
  }

  eliminarCliente(){

    const id: number = parseInt(sessionStorage.getItem("idEliminar")!);

    this.clienteService.eliminarCliente(id).subscribe({

      next: (response: ResponseModel) => {
        if(response.statusCode == 200){

          alert("Se ha eliminado el cliente!");
          this.modalService.setDismissReason(`eliminado${id}`);
          this.modalService.hide();
          
        }else{

          alert("No se pudo eliminar el cliente");

        }
      },
      error: (err) => {
        console.log(err)
        alert("No se pudo eliminar el cliente");
      }

    });

  }

}
