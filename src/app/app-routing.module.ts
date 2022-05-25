import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponenteInfoComponent } from './sistema/componente-info/componente-info.component';
//import { FormReclamLibro } from './sistema/formularios/reclam-libro';
import { ReclamLibroComponent } from './sistema/pages/reclam-libro/reclam-libro.component';
import { ServerPageComponent } from './sistema/pages/server-page/server-page.component';
import { SubmittedPageComponent } from './sistema/pages/submitted-page/submitted-page.component';


const routes: Routes = [
  { path: 'reclam-libro', component: ReclamLibroComponent },
  { path:'submitted-page', component: SubmittedPageComponent },
  { path: 'server-page', component: ServerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
