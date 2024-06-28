import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import { BoletaModel } from '../Shared/boleta.model';
import { BoletaRequestModel } from '../Shared/boletaRequest.model';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {

  url: String = environment.apiBoleta;

  constructor(private http: HttpClient) { }

  crearBoleta(boleta: BoletaRequestModel): Observable<BoletaModel>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post<BoletaModel>(`${this.url}`, boleta, {headers})
  }


}
