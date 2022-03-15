import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { Endereco, Pessoa } from './../../core/model';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Criando uma prop representando a nova pessoa a ser cadastrada. */
  pessoa = new Pessoa();

  // constructor() { }

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Injetando serv de pessoa, serv tratamento erro e serv de msg no comp. */
  constructor(private pesoaServ: PessoaService, private errHndServ: ErrorHandlerService,
    private msgServ: MessageService) { }

  ngOnInit(): void {
  }

/* 17.21. Desafio: implementando o cadastro de pessoas:
    Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro.
    Submentendo o form e tratando evto submissão no comp. */
  salvar(pessoaForm: NgForm) {
    try {
      /*  Como usar o oper ? ao campo endereco ñ funcionou p/ driblar os erros TS2531 e NG5002, mudei a estratégia
            de 2-way-databind p/ property-bind no front c/ atribs de campos às vars do modelo, na func de sumissão,
            no back. */
          let end =  this.pessoa.endereco || ( this.pessoa.endereco = new Endereco() );

          // Object.assign(end, pessoaForm.value);

          // Trocando método Object.assign(), comentado acima, pela estrut de repetição for...in, pois a prop nome ñ deve
          //   ser copiada como subprop da prop endereco.
          for (const prop in pessoaForm.value) {
            if (prop !== "nome" && pessoaForm.value.hasOwnProperty(prop)) {
              // end[prop] = pessoaForm.value[prop];

              // É preciso converter a expr p/ str e executar c/ eval() p/ a atrib funcionar
              eval(`end["${prop}"] = pessoaForm.value[prop];`);
            }
          }

          // Prop ativo p/ padrão começa c/ true
          this.pessoa.ativo = true;

          // console.log("Form pessoa:\n", pessoaForm);
          console.log("Salvando pessoa:\n", this.pessoa);

          this.pesoaServ.adicionar(this.pessoa).then(
            // Ñ iremos usar o lanç retornado no corpo de resp (o msm cadastrado), então podemos ignorar o param
            //  de entrada do hnd de tratamento de sucesso.
            () => {
              this.msgServ.add({
                severity:'success',
                summary:'Pessoa cadastrada!',
                detail: 'A pessoa foi adicionada com sucesso!'
              });

              pessoaForm.reset();
              this.pessoa = new Pessoa();
            }
          )
          .catch(erro => this.errHndServ.handle(erro));
    }
    catch(ex) {
      this.errHndServ.handle(ex);
    }
  }
}
