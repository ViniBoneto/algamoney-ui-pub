import { Component, OnInit } from '@angular/core';

/* 19.13. Protegendo rotas com guarda de rotas (CanActivate):
  Criando uma pág p/ se redirecionar e notificar ao usr q ele ñ tem perm p/ acessar um recurso. Isto é, qdo
    o usr ñ passar pela guarda de rotas (CanActivate).

Criado c/ o cmd "ng g c core/nao-autorizado --inline-style --inline-template --flat --skip-tests". C/ isso,
  ñ serão criados arq de estilo .css, de tmpl .html (q serão embutinos no arq .ts), de tst .spec e nem será
  criada uma pasta própria p/ o comp (--flat). */
@Component({
  selector: 'app-nao-autorizado',
  template: `
    <div class="container">
      <h1 class="text-center">Acesso negado!</h1>
      <h2 class="text-center">Você não tem permissão para acessar este recurso.</h2>
      <button (click)="voltar();">Voltar</button>
    </div>
  `,
  styles: [`button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 8px;

    font-size: 1em;
    line-height: 1.5;

    color: whitesmoke;
    background-color: #1E94D2;

    cursor: pointer;
  }`
  ]
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Ao se clicar no btn "voltar", volta-se 1 entrada no histórico, equiv a qdo se clica no btn voltar no browser.
  voltar() {
    history.back();
  }
}
