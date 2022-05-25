import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormReclamLibro } from '../formularios/reclam-libro';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { ReclamLibroComponent } from '../pages/reclam-libro/reclam-libro.component';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-componente-info',
  templateUrl: './componente-info.component.html',
  styleUrls: ['./componente-info.component.scss']
})
export class ComponenteInfoComponent implements OnInit {
  submitted: boolean = false;
  
  FormReclamLibro: FormGroup = FormReclamLibro;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any = [],
    public modalBaseDialogRef: MatDialogRef<ComponenteInfoComponent>) {
    console.log(this.data);
    this.FormReclamLibro.patchValue(this.data);
  }

  ngOnInit(): void {
  }

}
