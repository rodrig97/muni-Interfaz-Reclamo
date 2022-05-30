import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-componente-img',
  templateUrl: './componente-img.component.html',
  styleUrls: ['./componente-img.component.scss']
})
export class ComponenteImgComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ComponenteImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}




