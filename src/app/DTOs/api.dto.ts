


export interface LoginRequest {
  usuario: string;
  senha: string;
}
export interface CadastroRequest {
  usuario: string;
  email: string;
  senha: string;
}
export interface LoginResponse {
  accessToken: string;
  axpiresIn: number;
}


export interface RestauranteDTO {
  nome: string;
  Abertura: string; 
  fechamento: string;
}
export interface ItemDTO {
  nome: string;
  descrição: string;
}
export interface ResenhaDTO {
  titulo: string;
  conteudo: string;
}








export interface RestauranteResponse {
  id: number;
  nome: string;
  Abertura: string;
  fechamento: string;
}


export interface ItemResponse {
  id: number;
  nome: string;
  descricao: string;
}
export interface ResenhaResponse {
  id: number;
  titulo: string;
  conteudo: string;
  autor: string;
  nomeAlvo: string;
  dataCriacao: string;
  isRestaurante: boolean;
}
export interface LogResponse {
  mensagem: string;
  modificacoes: { modificacao: string }[];
}


export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

