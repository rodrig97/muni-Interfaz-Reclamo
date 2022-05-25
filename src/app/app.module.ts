import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Swal2Service } from './servicios/swal2.service';
import { ReclamLibroComponent } from './sistema/pages/reclam-libro/reclam-libro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './loader/interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SubmittedPageComponent } from './sistema/pages/submitted-page/submitted-page.component';
import { ServerPageComponent } from './sistema/pages/server-page/server-page.component';
import { MatCardModule } from '@angular/material/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ComponenteInfoComponent } from './sistema/componente-info/componente-info.component';
import { ComponentePdfComponent } from './sistema/componente-pdf/componente-pdf.component';
import { ComponenteSisgComponent } from './sistema/componente-sisg/componente-sisg.component';
import { ComponenteEmailComponent } from './sistema/componente-email/componente-email.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from 'primeng/toolbar';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import * as pdfMake from 'pdfmake/build/pdfmake';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  declarations: [
    AppComponent,
    ReclamLibroComponent,
    SubmittedPageComponent,
    ServerPageComponent,
    ComponenteInfoComponent,
    ComponentePdfComponent,
    ComponenteSisgComponent,
    ComponenteEmailComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MaterialModule,
    ToolbarModule,
    PdfViewerModule,
    MatTabsModule
    
    //pdfMake
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
