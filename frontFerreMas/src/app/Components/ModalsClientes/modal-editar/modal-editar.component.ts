import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClienteService } from 'src/app/Core/cliente.service';
import { ClienteModel } from 'src/app/Shared/cliente.model';
import { ResponseModel } from 'src/app/Shared/response.model';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent {

  clienteAEditar: ClienteModel = new ClienteModel();

  constructor(
    private clienteService: ClienteService,
    public modalService: BsModalService
  ){}

  ngOnInit(): void {
    this.clienteAEditar = JSON.parse(sessionStorage.getItem('cliente')!);
  }

  cerrarModal(){
    this.modalService.hide();
  }

  editarCliente():void{
    this.clienteService.editarCliente(this.clienteAEditar).subscribe({

      next: (response: ResponseModel) => {
        
        if(response.statusCode == 200){

          alert("Cliente Actualizado!");
          this.modalService.setDismissReason(`editado${JSON.stringify(this.clienteAEditar)}`);
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
