import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/Core/cliente.service';
import { ClienteModel } from 'src/app/Shared/cliente.model';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-anadir-cliente',
  templateUrl: './modal-anadir-cliente.component.html',
  styleUrls: ['./modal-anadir-cliente.component.scss']
})
export class ModalAnadirClienteComponent {

  nuevoCliente: ClienteModel = new ClienteModel();

  constructor(
    private clienteService: ClienteService,
    public modalService: BsModalService
  ){}

  cerrarModal(){
    this.modalService.hide();
  }

  agregarCliente(){

    this.clienteService.agregarCliente(this.nuevoCliente).subscribe({

      next: (response: ResponseModel) => {

        if(response.statusCode == 200){

          alert('Cliente agregado correctamente');

          this.modalService.setDismissReason(`creado${JSON.stringify(this.nuevoCliente)}`);
          this.modalService.hide();

        }
        else{

          alert(response.message);
          
        }

      },
      error: (err) => {
        alert("No se pudo agregar el Cliente");
        console.log(err);
      }

    })

  }
}
