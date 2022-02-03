import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

/* 17.12. Criando um serviço de tratamento de erros:
  Criamos um serv de tratamento de erros, p/ concentrar e padronizar o tratamento de erros da app. Este
  serv será criado e provido no mód Core, q é parte e uma extensão do AppModule (mód raiz), pois pode apenas
  ser importado p/ este. Este é um design de app recomendado no guia de estilo da documentação do NG. */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  // Injeta um serv de msg (toast) p/ exibir a msg de erro na tela.
  constructor(private msgServ: MessageService) { }

  // Método q irá tratar os erros
  handle(errorResp: any) {
    let msg: string;

    // Se errorResp for do tp str, interpreta-o como a msg de erro e exibe-a ao usr. Se for de outro tp (ex: um obj
    //   http resp ou outro), exibe uma msg de erro fixa ao usr e exibe errorResp na console.
    if(typeof errorResp === "string")
      msg = errorResp;
    else {
      msg = "Erro ao processar serviço remoto. Tente novamente.";
      console.error("Ocorreu um erro:\t", errorResp);
    }

    this.msgServ.add({
      severity:'error',
      summary:'Ocorreu um erro!',
      detail: msg});

    // Obs: Na prática foi verificado q, no ambiente duma app NG, o param erro recebido é um obj HttpErrorResponse.
  }
}
