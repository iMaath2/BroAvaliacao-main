import { Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../servicos/apiService/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginRequest, CadastroRequest } from '../../DTOs/api.dto';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatSelectModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements AfterViewInit {
  
  resenhasDestaque = [
    {
      titulo: 'Uma experiência incrível!',
      conteudo: '"O Cantinho da Vovó serve a melhor broa de fubá que já comi. O ambiente é super aconchegante e o atendimento é impecável. Recomendo a todos!"',
      autor: 'Ana Silva ',
      restaurante: 'Cantinho da Vovó'
    },
    {
      titulo: 'Sabor de infância!',
      conteudo: '"A broa de milho da Broa & Cia me transportou diretamente para a cozinha da minha avó. Simplesmente delicioso e com um preço justo. Voltarei sempre."',
      autor: 'Carlos Pereira ',
      restaurante: 'Broa & Cia'
    },
    {
      titulo: 'Perfeito para um café da tarde',
      conteudo: '"Se você procura um lugar tranquilo para um café, a Padaria Pão de Ouro é a escolha certa. O sonho de creme é divino e combina perfeitamente com o café coado."',
      autor: 'Juliana Costa ',
      restaurante: 'Padaria Pão de Ouro'
    }
  ];

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
  });

  fazerLogin(){
    
    if(this.formulario.valid){
      this.api.LogarUsuario(this.formulario.value as LoginRequest ).subscribe({
        next: (data) =>{
          sessionStorage.setItem("token",data.accessToken );
          this.formulario.reset;
          this.router.navigate(["/paginaPrincipal"]);
          this.router.navigate(['/restaurantes']); 

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
      this.api.cadastrarUsuario(this.formCadastro.value as CadastroRequest).subscribe({
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
