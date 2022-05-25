import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PideService {
  private backendApi = environment.backendApi;
  Urldni = environment.Urldni;
  Urlruc = environment.Urlruc;
  Urltoken = environment.Urltoken;
  constructor(private http: HttpClient) {}

  searchDni(dni: any, codigo: any) {
    let data = {
      dni: dni,
      codigo: codigo,
    };
    /*const url = this.Urldni + dni + '?token=' + this.Urltoken;
        return this.http.get(url);*/

    return this.http.post(`${this.backendApi}/pide/reniec`, data);
  }
  searchDniExterno(dni: any, codigo: any) {
    const url = this.Urldni + dni + '?token=' + this.Urltoken;
    return this.http.get(url);
  }

  searchRuc(ruc:any){
    const url = this.Urlruc+ ruc + '?token=' + this.Urltoken;
    return this.http.get(url);
    //`${this.backendApi}/pide/sunat/{ruc}`, ruc
  }

}
