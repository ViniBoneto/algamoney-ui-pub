import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

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

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService
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
  }

}
