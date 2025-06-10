import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import {  MatInputModule} from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../servicos/apiService/api.service';
import { loginRequest } from '../../DTOs/LoginDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { cadastroUsuarioRequest } from '../../DTOs/cadastroDTO';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements AfterViewInit{

  constructor(private api:ApiService, private router:Router){


  }
ngAfterViewInit() {let redi = sessionStorage.getItem("redirecionamento");
  if(redi != null && redi == "login"){

       this.scrolar(redi);

    sessionStorage.removeItem("redirecionamento");
  }
}
  
  formulario = new FormGroup({
    usuario: new FormControl("", [Validators.required, Validators.minLength(4)]),
    senha: new FormControl("", [Validators.required, Validators.minLength(4)])
  });

  formCadastro = new FormGroup({
    usuario: new FormControl("",[Validators.required, Validators.minLength(4)]),
    senha: new FormControl("",[Validators.required, Validators.minLength(4)]),
    confSenha: new FormControl("",[Validators.required, Validators.minLength(4)]),
    email: new FormControl("",[Validators.required, Validators.minLength(4), Validators.email]),
    data: new FormControl("",[Validators.required, Validators.minLength(10)]),
  });

  fazerLogin(){
    
    if(this.formulario.valid){
      this.api.LogarUsuario(this.formulario.value as loginRequest ).subscribe({
        next: (data) =>{
          sessionStorage.setItem("token",data.accessToken );
          this.formulario.reset;
          this.router.navigate(["/paginaPrincipal"]);

        },
        error: (error:HttpErrorResponse) =>{
          this.formulario.reset();
          alert(error.error.message)

        }
      });
    }
  }

  fazerCadastro(){
    console.log("metodo chamado")
    if(this.formCadastro.valid){
      this.api.cadastrarUsuario(this.formCadastro.value as cadastroUsuarioRequest).subscribe({
        next: (data) =>{
          console.log(data)
          this.formCadastro.reset();
          this.scrolar("login");
        },
        error: (error:HttpErrorResponse) =>{
          alert(error.error.message);
        }
      });
    }
  }

  scrolar(lugar:string){
    if("login" == lugar){ 
     window.scrollTo({
      top: window.innerHeight* 0.99,
      behavior:'smooth'

     });
    }
    else if("cadastro" == lugar){
      window.scrollTo({
        top: window.innerHeight* 1.89,
        behavior:'smooth'
  
       });
    }
    else if("cadastro2" == lugar){
      window.scrollTo({
        top: window.innerHeight* 0.90,
        behavior:'smooth'
  
       });
    }
  }
 
}
