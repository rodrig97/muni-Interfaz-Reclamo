import { Component, Inject, Injectable, OnInit, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormReclamLibro } from '../formularios/reclam-libro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ReclamosService } from 'src/app/servicios/reclamos.service';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-componente-email',
  templateUrl: './componente-email.component.html',
  styleUrls: ['./componente-email.component.scss']
})
export class ComponenteEmailComponent implements OnInit {

  enviado: boolean = false;
  FormReclamLibro: FormGroup = FormReclamLibro;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any = [],
  public modalBaseDialogRef: MatDialogRef<ComponenteEmailComponent>,
  private sanitizer: DomSanitizer, private ReclamosService:ReclamosService) { 
    this.FormReclamLibro.patchValue(this.data);
  }

  ngOnInit(): void {
  }

  sendMail() {
    this.ReclamosService.sendMailR(this.FormReclamLibro.value).subscribe(
      (resp: any) => {
        console.log(resp)
        if(resp.validated){
          this.enviado = true;
          console.log(`Correo fue enviado exitosamente a ${this.FormReclamLibro.value.ape_nom}`);
          this.modalBaseDialogRef.close(resp.validated);
        }
      },
      err => {
        console.log(err);
        this.enviado = false;
      }
    )
  }

}
