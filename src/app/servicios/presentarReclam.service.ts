import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PresentarReclamService {

    private backendApi = environment.backendApi;

    constructor(private http: HttpClient){

    }

    public PresentarReclam(req: Request){
        return this.http.post(`${this.backendApi}/reclamos/enviarReclamo`, req);
    }

}