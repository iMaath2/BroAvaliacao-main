import { Routes } from '@angular/router';


import { HomePageComponent } from './componentes/home-page/home-page.component';
import { RestauranteListaComponent } from './componentes/restaurante-lista/restaurante-lista.component';
import { RestauranteDetalhesComponent } from './componentes/restaurante-detalhes/restaurante-detalhes.component';
import { RestauranteCriarComponent } from './componentes/restaurante-criar/restaurante-criar.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  

  { path: 'restaurantes', component: RestauranteListaComponent },
  

  { path: 'restaurantes/criar', component: RestauranteCriarComponent },


  { path: 'restaurante/:id', component: RestauranteDetalhesComponent },
];