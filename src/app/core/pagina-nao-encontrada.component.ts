import { Component, OnInit } from '@angular/core';

/* 18.11. Tratando rota não encontrada:
  Comp a ser exibido qdo uma URL ñ for encontrada. Criado c/ o cmd "ng g c core/pagina-nao-encontrada --inline-style --inline-template --flat --skip-tests".
  C/ isso, ñ serão criados arq de estilo .css, de tmpl .html (q serão embutinos no arq .ts), de tst .spec e nem será criada uma pasta própria p/ o comp (--flat).

  Usaremos duas cls css do Bootstrap p/ estilizar o tmpl da pág: .container e .text-center. */
@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <div class="container">
      <div class="text-center logo_404">404</div>
      <h1 class="text-center"> Página não encontrada. </h1>
    </div>
  `,
  styles: [`
    .logo_404 {
      font-weight: bolder;
      font-size: 5rem;
    }`
  ]
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
