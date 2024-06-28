import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClienteModel } from '../Shared/cliente.model';
import { ResponseModel } from 'src/app/Shared/response.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: String = environment.apiBaseUr;
  listaClientes: ClienteModel[] = [];
  formData: ClienteModel = new ClienteModel();

  constructor(private http: HttpClient) { }

  // FUNCIÓN PARA OBTENER LOS CLIENTES:
  obtenerClientes(): Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${this.url}/obtenerClientes`)
  }

  editarCliente(cliente: ClienteModel): Observable<ResponseModel>{
    return this.http.put<ResponseModel>(`${this.url}/actualizarCliente/${cliente.id}`, cliente);
  } 

  // FUNCION DE ELIMINAR CLIENTE:
  eliminarCliente(id: number): Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(`${this.url}/eliminarCliente/${id}`);
  }

  // FUNCION DE AGREGAR CLIENTE:
  agregarCliente(cliente: ClienteModel): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.url}/añadirCliente`, cliente);
  }


}
