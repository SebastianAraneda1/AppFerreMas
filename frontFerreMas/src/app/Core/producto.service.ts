import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductoModel } from '../Shared/producto.model';
import { ResponseModel } from 'src/app/Shared/response.model';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: String = environment.apiBaseUr;
  listaProductos: ProductoModel[] = [];
  formData: ProductoModel = new ProductoModel();

  constructor(private http: HttpClient) { }

  // FUNCIÓN DE OBTENER PRODUCTOS:
  obtenerProductos(): Observable<ResponseModel>{
    return this.http.get<ResponseModel>(`${this.url}/obtenerProductos`);
  }

  // FUNCIÓN DE DESCONTAR STOCK:
  descontarStock(producto: ProductoModel): Observable<ResponseModel>{
    return this.http.put<ResponseModel>(`${this.url}/descontarStock/${producto.id}`, producto);
  }

  // FUNCIÓN DE EDITAR PRODUCTO:
  editarProducto(producto: ProductoModel): Observable<ResponseModel>{
    return this.http.put<ResponseModel>(`${this.url}/actualizarProducto/${producto.id}`, producto);
  } 

  // FUNCION DE ELIMINAR PRODUCTO:
  eliminarProducto(id: number): Observable<ResponseModel>{
    return this.http.delete<ResponseModel>(`${this.url}/eliminarProducto/${id}`);
  }

  // FUNCION DE AGREGAR PRODUCTO:
  agregarProducto(producto: ProductoModel): Observable<ResponseModel>{
    return this.http.post<ResponseModel>(`${this.url}/añadirProducto`, producto);
  }

}
