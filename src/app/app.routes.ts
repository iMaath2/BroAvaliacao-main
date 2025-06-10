import { Routes } from '@angular/router';
import { HomePageComponent } from './componentes/home-page/home-page.component';
import { PaginaRecupeComponent } from './componentes/pagina-recupe/pagina-recupe.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';

export const routes: Routes = [
   {path: "", component:HomePageComponent},
   {path: "recuperar", component:PaginaRecupeComponent},
   {path:"paginaPrincipal", component:PaginaPrincipalComponent}
];
