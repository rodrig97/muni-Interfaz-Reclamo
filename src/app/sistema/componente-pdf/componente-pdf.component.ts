import { Component, Inject, Injectable, OnInit, SecurityContext } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormReclamLibro } from '../formularios/reclam-libro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//import { PdfMakeWrapper } from 'pdfmake-wrapper';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-componente-pdf',
  templateUrl: './componente-pdf.component.html',
  styleUrls: ['./componente-pdf.component.scss'],
})
export class ComponentePdfComponent implements OnInit {
  submitted: boolean = false;
  FormReclamLibro: FormGroup = FormReclamLibro;
  url:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = [],
    public modalBaseDialogRef: MatDialogRef<ComponentePdfComponent>,
    private sanitizer: DomSanitizer
  ) {
    this.FormReclamLibro.patchValue(this.data);
    this.url = null;
    this.createPdf();
  }

  ngOnInit(): void {}

pipe = new DatePipe('en-US');
  createPdf() {
    const fecha =  this.pipe.transform((new Date(this.data.created_at)), 'dd/MM/yyyy');
    const pdfDefinition: any = {
      content: [
        /*{ image: 'mpilo_logo/png;base64,...encodedContent...',
        width: 100,
        height: 100
        },*/

        // {{ this.data.created_at | date }}
        { text: 'Hoja de reclamo N° 000000' + this.data.id + ' - ' + fecha, alignment: 'left', fontSize: 11 }, 
        { text: 'Municipalidad Provincial de ILO', bold: true, style: 'header', fontSize: 19, alignment: 'center' },
        { text: 'Libro de reclamos', style: 'subheader', fontSize: 16, alignment: 'left' },
        {
          style: 'tableExample',
          table: {
            body: [
              [{text:'Identificación del usuario', style:'header1', fontSize: 13}, {text: 'Identificación de la atención brindada', style:'header1', fontSize: 13}, {text: 'Detalle del reclamo', style:'header1', fontSize: 13}],
              [
                {
                  stack: [
                    {
                      ul: [
                        {text: 'Nombre: ' + this.data.ape_nom, fontSize: 13},
                        {text: 'Teléfono: '+ this.data.phone, fontSize: 13},
                        {text: 'DNI/RUC: '+ this.data.ndoc, fontSize: 13},
                        {text: 'Email: '+ this.data.email, fontSize: 13}
                      ]
                    }
                    
                  ]
                },
                
                [
                  {text: this.data.descripcion}
                ],
                {text: this.data.detalle}
              ]
            ]
          }
        },
        
////
      ],
      styles: {
        header1: {
          fillColor: 'grey',
		      fillOpacity: 0.3
        }
      }
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.getDataUrl((data) => {
      this.FormReclamLibro.controls['url'].setValue(data);
      
    });
    //console.log(this.FormReclamLibro.value);
    //this.photoURL(this.FormReclamLibro.value.url)
    
    //return pdf;
    //pdf.open();
  }

  cleanURL(oldURL: string)  {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
   }
}
