import { Injectable } from '@angular/core';
import { 
  LoginRequest, 
  CadastroRequest,
  LoginResponse,
  Page, 
  RestauranteDTO, 
  RestauranteResponse, 
  ItemResponse, 
  LogResponse, 
  ItemDTO,
  ResenhaDTO,
  ResenhaResponse
} from '../../DTOs/api.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = "http://localhost:8080/api/v1";

  constructor(private http: HttpClient) { }

  LogarUsuario(dados: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/usuario/login`, dados);
  }

  cadastrarUsuario(dados: CadastroRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/usuario/`, dados);
  }


  listarRestaurantes(pagina = 0, linhas = 10): Observable<Page<RestauranteResponse>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('linhas', linhas.toString());
    return this.http.get<Page<RestauranteResponse>>(`${this.url}/restaurante/listar`, { params });
  }

  criarRestaurante(dados: RestauranteDTO): Observable<RestauranteResponse> {
    return this.http.post<RestauranteResponse>(`${this.url}/restaurante/criar`, dados);
  }

  listarLogDoRestaurante(restauranteId: number): Observable<Page<LogResponse>> {
    return this.http.get<Page<LogResponse>>(`${this.url}/restaurante/${restauranteId}/log`);
  }


  listarItensDoRestaurante(restauranteId: number): Observable<Page<ItemResponse>> {
    return this.http.get<Page<ItemResponse>>(`${this.url}/restaurante/${restauranteId}/item/listar`);
  }

  criarItem(restauranteId: number, dados: ItemDTO): Observable<ItemResponse> {

    return this.http.post<ItemResponse>(`${this.url}/restaurante/${restauranteId}/item/criar`, dados);
  }


  criarResenhaRestaurante(restauranteId: number, dados: ResenhaDTO): Observable<ResenhaResponse> {
    return this.http.post<ResenhaResponse>(`${this.url}/resenha/escrever/restaurante/${restauranteId}`, dados);
  }

    listarResenhasDoItem(itemId: number, pagina = 0, linhas = 10): Observable<Page<ResenhaResponse>> {
    const params = new HttpParams().set('pagina', pagina.toString()).set('linhas', linhas.toString());
    return this.http.get<Page<ResenhaResponse>>(`${this.url}/resenha/listar/item/${itemId}`, { params });
  }

  criarResenhaItem(itemId: number, dados: ResenhaDTO): Observable<ResenhaResponse> {
    return this.http.post<ResenhaResponse>(`${this.url}/resenha/escrever/item/${itemId}`, dados);
  }

  listarResenhasDoRestaurante(restauranteId: number, pagina = 0, linhas = 10): Observable<Page<ResenhaResponse>> {
    const params = new HttpParams()
      .set('pagina', pagina.toString())
      .set('linhas', linhas.toString());
    return this.http.get<Page<ResenhaResponse>>(`${this.url}/resenha/listar/restaurantes/${restauranteId}`, { params });
  }
}