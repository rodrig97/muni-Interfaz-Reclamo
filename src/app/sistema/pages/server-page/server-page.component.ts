import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LazyLoadEvent } from 'primeng/api';
import { ReclamosService } from 'src/app/servicios/reclamos.service';
import { ComponenteInfoComponent } from '../../componente-info/componente-info.component';
import { ComponentePdfComponent } from '../../componente-pdf/componente-pdf.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ComponenteSisgComponent } from '../../componente-sisg/componente-sisg.component';
import { ComponenteEmailComponent } from '../../componente-email/componente-email.component';

//import { PdfMakeWrapper } from 'pdfmake-wrapper';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

//import { ReclamLibroComponent } from '../reclam-libro/reclam-libro.component';

@Component({
  selector: 'app-server-page',
  templateUrl: './server-page.component.html',
  styleUrls: ['./server-page.component.scss'],
})
export class ServerPageComponent implements OnInit {
  //pressed : boolean = false;
  loadingRefresh = [false, false, false, false];

  load(index: any) {
    this.loadingRefresh[index] = true;
    setTimeout(() => (this.loadingRefresh[index] = false), 1000);
  }
  constructor(
    private ReclamosService: ReclamosService,
    private ComponenteSisgComponent: ComponenteSisgComponent,
    private dialog: MatDialog
  ) {
    this.getAllDataReclamo();
  }

  cols: any = [];
  exportColumns: any = [];
  dataRec: any = [];
  dataDer: any = [];
  dataEmail: any = [];
  //emailUsed: number = 0;

  ngOnInit(): void {
    this.cols = [
      { width: 2, type: 'text', field: 'id', header: 'Nro' },
      { width: 2, type: 'text', field: 'ape_nom', header: 'Nombre de Reclamante' },
      { width: 2, type: 'text', field: 'ndoc', header: 'N Doc.' },
      { width: 7, type: 'text', field: 'descripcion', header: 'Descripción de Reclamo'},
      { width: 3, type: 'text', field: 'email', header: 'Email' },
      { width: 2, type: 'text', field: 'expe_id', header: 'Sisgedo' },
      { width: 2, type: 'date', field: 'created_at', header: 'Fecha' },
      { width: 2, type: 'accion', field: 'expe_id', header: 'Accion' },
    ];

    this.exportColumns = this.cols.map((col: any) => ({
      width: col.width,
      type: col.type,
      title: col.header,
      dataKey: col.field,
    }));
  }

  public getAllDataReclamo() {
    this.loading = true;
    this.ReclamosService.getAllDataReclam().subscribe(
      (data: any) => {
        console.log(data);
        this.dataRec = data.data.filter(
          (i: any) => Number(i.operacion) === 0
        );
        this.dataDer = data.data.filter(
          (i: any) => Number(i.operacion) > 0 && i.updated_at === null
        );
        this.dataEmail = data.data.filter(
          (i: any) => Number(i.operacion) > 0 && i.updated_at !== null
        );
        //console.log(this.dataRec)
        this.loading = false;
      },
      (err: any) => {}
    );
  }

  InfoDialog(data: any) {
    const dialogRef = this.dialog.open(ComponenteInfoComponent, {
      width: '800px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  reclamoPdf(data: any) {
    const dialogRef = this.dialog.open(ComponentePdfComponent, {
      width: 'auto',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  sisgDialog(data: any) {
    //ComponenteSisgComponent.EnviarOperacion().pressed = true;
    const dialogRef = this.dialog.open(ComponenteSisgComponent, {
      width: 'auto',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllDataReclamo();
      }
    });
  }

  emailDialog(data: any) {
    //this.emailUsed +=1;
    const dialogRef = this.dialog.open(ComponenteEmailComponent, {
      width: 'auto',
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAllDataReclamo();
    });
  }

  loading!: boolean;

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      this.getAllDataReclamo();
    }, 1000);
  }
}
