import { HttpErrorResponse } from '@angular/common/http';
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
    let msg: string | undefined;

    // Se errorResp for do tp str, interpreta-o como a msg de erro e exibe-a ao usr. Se for de outro tp (ex: um obj
    //   http resp ou outro), exibe uma msg de erro fixa ao usr e exibe errorResp na console.
/*     if(typeof errorResp === "string")
      msg = errorResp;
    else {
      msg = "Erro ao processar serviço remoto. Tente novamente.";
      console.error("Ocorreu um erro:\t", errorResp);
    } */

/*  17.14. Desafio: mensagem de erro de usuário na exclusão de pessoa:
      Vamos adicionar uma condição p/ q, se o tp do param de erro (errorResp) for um HttpErrorResponse
      (tp do NG p/ indicar uma resp http c/ erro) ou for do tp Response (tp da API Fetch do JS p/ indicar
      um ret http) e o status de ret HTTP for um erro do cliente (cód status entre 400 e 499), a msg de
      erro p/ o usr, vinda no corpo de resp, deverá ser exibida no comp de msg Toast. Caso ñ haja esta msg,
      a msg de erro pré-def deverá ser exibida, como ocorre nos d+ casos.

    Em ambos os casos, o corp da resp conterá um array de objs de erro, cada um c/ uma msg p/ o usr e outra
      p/ o dev. Deverá ser obtida a msg de erro p/ usr do 1º obj de erro, caso haja + de 1. O corpo da resp,
      como obj JS, poderá ser obtido através do param HttpErrorResponse.error ou do método Response.json(). */
    if(typeof errorResp === "string")
      msg = errorResp;
    else {
      let errors;

      if(errorResp instanceof Response && (errorResp.status > 399 && errorResp.status < 500) )
        errors = errorResp.json();
      else if(errorResp instanceof HttpErrorResponse && (errorResp.status > 399 && errorResp.status < 500))
        errors = errorResp.error;

      errors && errors[0] && (msg = errors[0].mensagemUsuario);

/*    Obs: Sugestão presente no cód fornecido como solução pela Algaworks:
        if (typeof errorResponse === 'string') {
          msg = errorResponse;

        } else if (errorResponse instanceof HttpErrorResponse
            && errorResponse.status >= 400 && errorResponse.status <= 499) {
          msg = 'Ocorreu um erro ao processar a sua solicitação';

          try {
            msg = errorResponse.error[0].mensagemUsuario;
          } catch (e) { }

          console.error('Ocorreu um erro', errorResponse);

        } else {
          msg = 'Erro ao processar serviço remoto. Tente novamente.';
          console.error('Ocorreu um erro', errorResponse);
        } */
    }

    if(msg === undefined || msg === "")
      msg = "Erro ao processar serviço remoto. Tente novamente.";

    console.error("Ocorreu um erro:\t", errorResp);

    this.msgServ.add({
      severity:'error',
      summary:'Ocorreu um erro!',
      detail: msg});

    // Obs: Na prática foi verificado q, no ambiente duma app NG, o param erro recebido é um obj HttpErrorResponse.
  }
}
