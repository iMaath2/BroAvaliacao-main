import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../servicos/apiService/api.service';
import { recuperarRequest } from '../../DTOs/recuperarSenha';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-recupe',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './pagina-recupe.component.html',
  styleUrl: './pagina-recupe.component.css'
})
export class PaginaRecupeComponent {
  constructor(private api: ApiService, private router:Router) {
    sessionStorage.setItem("redirecionamento", "login");
  }
  mensagemErroE: string;
  mensagemErroS: string;
  mensagemErroCV: string;

  houveErro: boolean;

  formulario = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.minLength(4)]),
    senha: new FormControl("", [Validators.required, Validators.minLength(4)]),
    cSenha: new FormControl("", [Validators.required, Validators.minLength(4)])
  });

  requerirRecuperacao() {
    if (this.formulario.valid && (this.formulario.value.cSenha === this.formulario.value.senha)) {

      this.api.RecuperarSenha(this.formulario.value as recuperarRequest).subscribe({
        next: (data) => {
          this.formulario.reset();
          this.router.navigate(["/"]);

        },
        error: (error: HttpErrorResponse) => {

          if (this.api.verificarErro(error) == false) {
            this.mensagemErroE =error.error.message;
            this.mensagemErroS = error.error.message;
            this.mensagemErroCV = error.error.message;
            this.formulario.reset();
            this.houveErro = true;
          }


        }
      })
    }
  }

  validarCampo(campo:string){
    
    if(this.formulario.get(campo).valid){
      this.houveErro = false;
      return false;
    } 
    else if(this.formulario.get(campo).invalid){
       if( campo == "email") this.mensagemErroE = "compo precisa de no minimo 4 letras";
       else if( campo == "senha") this.mensagemErroS = "compo precisa de no minimo 4 letras";
       else if( campo == "cSenha") this.mensagemErroCV = "compo precisa de no minimo 4 letras";

      }
      
      return true;
  }
}
