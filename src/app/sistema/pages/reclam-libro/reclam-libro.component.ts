import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PresentarReclamService } from 'src/app/servicios/presentarReclam.service';
import { FormReclamLibro } from '../../formularios/reclam-libro';
import { Router } from '@angular/router';
import { Swal2Service } from 'src/app/servicios/swal2.service';
import { PideService } from 'src/app/servicios/pide.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponenteImgComponent } from '../../componente-img/componente-img.component';

@Component({
  selector: 'app-reclam-libro',
  templateUrl: './reclam-libro.component.html',
  styleUrls: ['./reclam-libro.component.scss'],
})
export class ReclamLibroComponent implements OnInit {
  @ViewChild('content', { static: true }) contenidoDelModal;
  //public modal: NgbModal,

  submitted: boolean = true;
  FormReclamLibro: FormGroup = FormReclamLibro;
  constructor(
    private PresentarReclamService: PresentarReclamService,
    private router: Router,
    private Swal2Service: Swal2Service,
    private PideService: PideService,
    private dialog: MatDialog,
    private modalService: NgbModal
  ) {}
  closeResult = '';
  ngOnInit(): void {
    this.modalService
      .open(this.contenidoDelModal, { ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop:false })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /* -------------------------------------------------------------------------------------------------------- */
  searchDni() {
    if (
      this.FormReclamLibro.value.ndoc.length >= 8 &&
      this.FormReclamLibro.value.nroVerifDNI != '' &&
      this.FormReclamLibro.value.nroVerifDNI.length == 1 &&
      this.FormReclamLibro.value.tipo_doc == 0
    ) {
      if (this.FormReclamLibro.value.tipo_doc != 0) {
        this.FormReclamLibro.controls['ndoc'].setValue(null);
        this.FormReclamLibro.controls['nroVerifDNI'].setValue(null);
      }
      this.PideService.searchDniExterno(
        this.FormReclamLibro.value.ndoc,
        this.FormReclamLibro.value.nroVerifDNI
      ).subscribe(
        (resp: any) => {
          console.log(resp);
          if (
            Number(resp.codVerifica) ==
            Number(this.FormReclamLibro.value.nroVerifDNI)
          ) {
            this.FormReclamLibro.controls['ape_nom'].setValue(
              resp.nombres +
                ' ' +
                resp.apellidoPaterno +
                ' ' +
                resp.apellidoMaterno
            ),
              this.FormReclamLibro.controls['nombres'].setValue(resp.nombres),
              this.FormReclamLibro.controls['apPaterno'].setValue(
                resp.apellidoPaterno
              ),
              this.FormReclamLibro.controls['apMaterno'].setValue(
                resp.apellidoMaterno
              );

            /*if (this.FormReclamLibro.value.tipo_doc != 0){
              this.FormReclamLibro.controls['ndoc'].setValue(null);
              this.FormReclamLibro.controls['nroVerifDNI'].setValue(null);
            }*/
          } else {
            this.Swal2Service.alertaToast(
              'ATENCIÓN',
              'Código verificador erróneo',
              'warning'
            );
            this.FormReclamLibro.controls['nombres'].setValue(null);
          }
          //console.log(resp)
        },
        (error: any) => {
          //console.log(error)
        }
      );
    } else {
      this.FormReclamLibro.controls['nombres'].setValue(null);
      this.FormReclamLibro.controls['apPaterno'].setValue(null);
      this.FormReclamLibro.controls['apMaterno'].setValue(null);
    }
    //console.log(this.FormReclamLibro.value.tipo_doc);
    /*if (this.FormReclamLibro.value.tipo_doc != 0 &&
      this.FormReclamLibro.value.ndoc != null){
      this.FormReclamLibro.controls['ndoc'].setValue(null);
    }*/
  }

  /* -------------------------------------------------------------------------------------------------------- */

  searchRuc() {
    if (
      this.FormReclamLibro.value.ndoc.length == 11 &&
      this.FormReclamLibro.value.nroVerifDNI.length == '' &&
      this.FormReclamLibro.value.tipo_doc == 1
    ) {
      this.PideService.searchRuc(this.FormReclamLibro.value.ndoc).subscribe(
        (resp: any) => {
          console.log(resp);
          //if(Number(resp.ndoc) == Number(this.FormReclamLibro.value.ndoc))
          if (Number(resp.ruc) == Number(this.FormReclamLibro.value.ndoc)) {
            this.FormReclamLibro.controls['ape_nom'].setValue(resp.razonSocial),
              this.FormReclamLibro.controls['nombres'].setValue(
                this.FormReclamLibro.value.ape_nom.slice(14, 28)
              ),
              this.FormReclamLibro.controls['apPaterno'].setValue(
                this.FormReclamLibro.value.ape_nom.slice(0, 6)
              ),
              this.FormReclamLibro.controls['apMaterno'].setValue(
                this.FormReclamLibro.value.ape_nom.slice(7, 13)
              );

            /*if (this.FormReclamLibro.value.tipo_doc != 1 &&
              this.FormReclamLibro.value.ndoc != null) {
              this.FormReclamLibro.controls['ndoc'].setValue(null);
              this.FormReclamLibro.controls['nroVerifDNI'].setValue(null);
            }*/
          } else {
            this.Swal2Service.alertaToast(
              'ATENCIÓN',
              'Numero de RUC erróneo',
              'warning'
            );
            this.FormReclamLibro.controls['nombres'].setValue(null);
          }
        },
        (error: any) => {}
      );
    } else {
      this.FormReclamLibro.controls['nombres'].setValue(null);
      this.FormReclamLibro.controls['apPaterno'].setValue(null),
        this.FormReclamLibro.controls['apMaterno'].setValue(null);
    }
  }

  clear() {
    this.FormReclamLibro.controls['ndoc'].setValue('');
    this.FormReclamLibro.controls['nroVerifDNI'].setValue('');
    this.FormReclamLibro.controls['nombres'].setValue('');
    this.FormReclamLibro.controls['apPaterno'].setValue(''),
      this.FormReclamLibro.controls['apMaterno'].setValue('');
  }

  PresentarReclamo() {
    this.submitted = true;
    /*this.adjuntar_doc_princ.length > 0
      ? (this.adjuntar_doc_princ['anexos'] = this.anexos)
      : '';
    this.FormReclamLibro.controls['adjuntar_doc_princ'].setValue(
      this.adjuntar_doc_princ
    );*/
    //this.FormReclamLibro.controls['anexos'].setValue(this.anexos);
    console.log(this.FormReclamLibro.value);
    if (this.FormReclamLibro.valid) {
      this.PresentarReclamService.PresentarReclam(
        this.FormReclamLibro.value
      ).subscribe(
        (resp: any) => {
          console.log(resp);
          if (resp.validated) {
            console.log(1);
            this.router.navigate(['./submitted-page']);
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

  firstDialog() {
    const dialogRef = this.dialog.open(ComponenteImgComponent, {
      width: '250px',
      data: { img: 'assets/img/verificadordni.jpg' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
