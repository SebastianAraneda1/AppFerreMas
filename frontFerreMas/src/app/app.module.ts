import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalAgregarProductoComponent } from './Components/Modals/modal-agregar-producto/modal-agregar-producto.component';
import { ModalEditarProductoComponent } from './Components/Modals/modal-editar-producto/modal-editar-producto.component';
import { ModalEditarComponent } from './Components/ModalsClientes/modal-editar/modal-editar.component';
import { ModalBorrarProductoComponent } from './Components/Modals/modal-borrar-producto/modal-borrar-producto.component';
import { ModalAnadirClienteComponent } from './Components/ModalsClientes/modal-anadir-cliente/modal-anadir-cliente.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    AdministradorComponent,
    ModalAgregarProductoComponent,
    ModalEditarProductoComponent,
    ModalEditarComponent,
    ModalBorrarProductoComponent,
    ModalAnadirClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
