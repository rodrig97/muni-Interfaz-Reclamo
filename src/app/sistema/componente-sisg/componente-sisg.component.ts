import { Component, Inject, Injectable, OnInit, SecurityContext } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormReclamLibro } from '../formularios/reclam-libro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Swal2Service } from 'src/app/servicios/swal2.service';
//import { MPVService } from 'src/app/servicios/mpv.service';
import { formDependencia } from '../formularios/dependencia';
import { DependenciasService } from 'src/app/servicios/depen.service';
import { ReclamosService } from 'src/app/servicios/reclamos.service';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-componente-sisg',
  templateUrl: './componente-sisg.component.html',
  styleUrls: ['./componente-sisg.component.scss']
})
export class ComponenteSisgComponent implements OnInit {
  pressed:boolean = false;
  control = new FormControl();
  dependencias: any = [];
  formDependencia: FormGroup = formDependencia;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any = [],
  public modalBaseDialogRef: MatDialogRef<ComponenteSisgComponent>,
  private sanitizer: DomSanitizer, private Swal2Service:Swal2Service,
  private ReclamosService:ReclamosService,
  private DependenciasService:DependenciasService) { 
    
    this.formDependencia.patchValue(this.data);
    this.listDependencias();
  }
  

  ngOnInit(): void {
  }

  listDependencias() {
    this.DependenciasService.getdependencias().subscribe(
      (data: any) => {
        //console.log(data)
        this.dependencias = data;
      },
      (err: any) => {}
    );
  }

  filtrarDependencia() {
    const data = this.dependencias.filter(
      (i: any) => i.depe_id === Number(this.formDependencia.value.codigo)
    );
    data.length > 0
      ? this.formDependencia.controls['depe_id'].setValue(
          data[data.length - 1]['depe_id']
        )
      : this.formDependencia.controls['depe_id'].setValue(null);
  }


  
  destinos: any = [];

  GuardarDestinos() {
    //console.log(this.formOperacion.value)
    //tabla: operacion
    let verificar = this.destinos.filter(
      (i: any) => i.dependencia === Number(this.formDependencia.value.depe_id)
    );
    if (verificar.length) {
      this.Swal2Service.alertaToast(
        'ATENCIÓN',
        'Debe de seleccionar otra dependencia.',
        'warning'
      );
    } else {
      let data = this.dependencias.filter(
        (i: any) => i.depe_id === Number(this.formDependencia.value.depe_id)
      );
      this.destinos.push({
        id: this.destinos.length,
        original: 'ORIGINAL',
        copia: this.formDependencia.value.oper_forma
          ? this.formDependencia.value.oper_forma
          : false, // oper_forma
        dependencia: this.formDependencia.value.depe_id, // depe_id
        dependencia_name: data[data.length - 1]['depe_nombre'], // depe_id
        proveido: this.formDependencia.value.oper_acciones, // oper_acciones

        //path_primary:this.cDocumento,
        //name_primary:this.nombreArchivo
      });
      //this.formOperacion.reset();
      this.formDependencia.controls['relacionado'].setValue(null);
      this.formDependencia.controls['codigo'].setValue(null);
      this.formDependencia.controls['depe_id'].setValue(null);
      this.formDependencia.controls['oper_forma'].setValue(null);
      this.formDependencia.controls['oper_acciones'].setValue(null);
    }
  }

  deleteArch(i: any) {
    this.destinos.splice(i, 1);
    //console.log(this.destinos);
  }

  EnviarOperacion() {
    this.pressed = true;
    console.log(this.formDependencia);
    if (this.destinos.length > 0) {
      this.formDependencia.controls['destinos'].setValue(this.destinos);
      console.log(1);
      this.ReclamosService.derivarReclam(this.formDependencia.value).subscribe(
        (resp: any) => {
          if(resp.validated){
            this.Swal2Service.alertaToast(
              'Guardado',
              'Se guardó con éxito',
              'success'
            );
            this.modalBaseDialogRef.close(resp.validated);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.Swal2Service.alertaToast(
        'ATENCIÓN',
        'Debe de completar todos los campos',
        'warning'
      );
    }
  }

}
