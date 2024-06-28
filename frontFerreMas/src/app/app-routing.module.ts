import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './Components/administrador/administrador.component';
import { ClienteComponent } from './Components/cliente/cliente.component';

const routes: Routes = [
  {path: 'administracion', component: AdministradorComponent},
  {path: 'inicio', component: ClienteComponent},
  {path: '', component: ClienteComponent, pathMatch: 'full'},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
