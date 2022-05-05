import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { AuthService } from './shared/auth.service';
// import { obterAccessToken } from './shared/shared.module';

// import { PessoaService } from './pessoas/pessoa.service';
// import { CategoriaService } from './categorias/categoria.service';

/* 17.20. Implementando o serviço de cadastro de lançamentos:
  Transferindo a prop oauth2Token do serv de auth p/ o comp raiz (AppComponent), p/, c/ isto, o seu estado
  ser mantido ao longo da app, até ser alterado programaticamente. */
export var oauth2Token = "RecebeAlgumoauth2TokenValido";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {

/* 17.11. Alterando o locale da aplicação para pt-BR:
    Configuração do serviço de tradução:
      A configuração do serviço de tradução é feita no AppComponent através da definição da linguagem padrão do sistema e
      de uma chamada assíncrona do tipo get. Esta operação é realizada na inicialização do componente, ou seja, deve ser
      colocada no método ngOnInit(). */
export class AppComponent implements OnInit {

  title = 'algamoney-ui';
  // primChamada = true;
  // oauth2Token: string | undefined;

  // Criando props p/ preencher comboboxes (selects) na view, c/ pessoas e categs, p/ testar servs de listagem de pessoas (aula 17.7)
  //   e de categs (aula 17.16), q serão, futuramente, usados p/ carregar as combos na tela de cadastro de lancs.
  // arrPessoas!: any[];
  // arrCategs!: any[];

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService,

    // Injetando servs de listagem de pessoas (aula 17.7) e de categs (aula 17.16), p/ preencher comboboxes (selects) na view, c/ pessoas
    //  e categs, p/ testar estes servs, q serão, futuramente, usados p/ carregar as combos na tela de cadastro de lancs.
    // ,
    // private pessoaServ: PessoaService,
    // private categServ: CategoriaService

/*  17.20. Implementando o serviço de cadastro de lançamentos:
      Injetando serv c/ funcs q retornam o access token oauth2 p/ os servs da app q o requerem. Isto poupará o trab
      de ter q copiar e colar o token do Postman p/ os servs. */
    private authServ: AuthService,

/*  19.3. Desafio: módulo de segurança e protótipo da tela de login:
      Inserindo cond p/ só exibir barra de nav se ñ estiver na tela de login. P/ isto, é preciso injetar no comp raiz
      o serv de roteamento p/ verificar qual a URL ativa. */
    private router: Router
  ) {}

  ngOnInit(): void {
/* 17.11. Alterando o locale da aplicação para pt-BR:
    Configuração do serviço de tradução:
      A configuração do serviço de tradução é feita no AppComponent através da definição da linguagem padrão do sistema e
      de uma chamada assíncrona do tipo get. Esta operação é realizada na inicialização do componente, ou seja, deve ser
      colocada no método ngOnInit(). */
    // this.translateService.setDefaultLang('pt');
    // this.translateService.get('primeng')
      // .subscribe(res => this.config.setTranslation(res));
/*       .subscribe(res => {
        console.log("Aplicando alterações de locale nas configs do PNG TranslateService p/ o calendário...");
        console.log(`res:\t${JSON.stringify(res)}`);
        this.config.setTranslation(res);
      },
        err => console.error(`Erro ao tentar configurar o PNG TranslateService. Erro:\t${JSON.stringify(err)}`),
        () => console.info(`Configuração PNG TranslateService terminada.`) ); */

/* 17.11. Alterando o locale da aplicação para pt-BR:
    Outra opção para tradução do calendário:
      Uma outra maneira de configurar a tradução é utilizar apenas o PrimeNGConfig para esta finalidade. Esta solução
      é mais simples, mas oferece menos flexibilidade para a troca dinâmica de configurações. */
    this.config.setTranslation({
        accept: 'Accept',
        reject: 'Cancel',
        "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        "dayNamesMin": ["Do","Se","Te","Qa","Qi","Sx","Sa"],
        "monthNames": ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        "today": "Hoje",
        "weekHeader": "Sem"
    });

    // Inicializa props p/ preencher comboboxes (selects) na view, c/ pessoas e categs, usando os servs de listagem de tps respectivos.
    // this.pessoaServ.listar().then( resp => this.arrPessoas = resp );
    // this.categServ.listar().then( resp => this.arrCategs = resp );
  }

  // 17.20. Implementando o serviço de cadastro de lançamentos:
  //  Tst da func obterOauth2AccessToken(), q ret o access token oauth2 p/ os servs da app q o requerem.
  // async obterAccessToken(sync: boolean = false): Promise<string | undefined> {
  //   if(this.primChamada) {
  //     // this.oauth2Token = await ( sync ? this.authServ.obterOauth2AccessTokenSync() : this.authServ.obterOauth2AccessToken() );
  //     this.oauth2Token = await obterAccessToken(this.authServ, sync);
  //     this.primChamada = false;
  //   }

  //   return this.oauth2Token /* obterOauth2AccessToken() */;
  // }

/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
    Inserindo cond p/ só exibir barra de nav se ñ estiver na tela de login. P/ isto, é preciso injetar no comp raiz
    o serv de roteamento p/ verificar qual a URL ativa. */
  exibirBarraNav(): boolean {
    return this.router.url !== "/login";
  }
}
