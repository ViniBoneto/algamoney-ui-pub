import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { AuthHttpError } from '../seguranca/money-http.interceptor';

/* 17.12. Criando um serviço de tratamento de erros:
  Criamos um serv de tratamento de erros, p/ concentrar e padronizar o tratamento de erros da app. Este
  serv será criado e provido no mód Core, q é parte e uma extensão do AppModule (mód raiz), pois pode apenas
  ser importado p/ este. Este é um design de app recomendado no guia de estilo da documentação do NG. */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    // Injeta um serv de msg (toast) p/ exibir a msg de erro na tela.
    private msgServ: MessageService,
    // 19.14. E se o Refresh Token expirar?
    //   Injeta serv de roteamento na cls, p/ poder fazer o redir p/ outras págs (ex: pág de login).
    private router: Router
  ) { }

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

      // if(errorResp instanceof Response && (errorResp.status > 399 && errorResp.status < 500) )
      //   errors = errorResp.json();
      // else if(errorResp instanceof HttpErrorResponse && (errorResp.status > 399 && errorResp.status < 500))
      //   errors = errorResp.error;

      // errors && errors[0] && (msg = errors[0].mensagemUsuario);

/*    19.12. Protegendo componentes:
        Mudaremos a forma de proteger o acesso e opers sobre comps os quais o usr ñ tiver perm. O btn de exc, na pág
          de pesq, será desabilidado (prop disabled), enquanto os btns de edt e ins permanecerão habilitados. Porém,
          ao serem feitas estas opers p/ um usr s/ perm, o erro retornado pela API (HTTP status 403) será mapeado p/
          uma msg amigável informativa ao usr. P/ isto, precisaremos discriminar o status 403 no tratamento de erros. */
      if( errorResp.status > 399 && errorResp.status < 500 ) {
        if( errorResp.status === 403 )
          msg = "Você não tem permissão para executar esta ação.";
        else if( errorResp instanceof Response )
            errors = errorResp.json();
        else if( errorResp instanceof HttpErrorResponse )
            errors = errorResp.error;

          errors && errors[0] && (msg = errors[0].mensagemUsuario);
      }
/*    19.14. E se o Refresh Token expirar?
        Usando uma cls de erro espec customizada, p/ discriminar expiração do refresh token e tratar de acordo
          (redir o usr p/ pág de login). */
      else if(errorResp instanceof AuthHttpError) {
        msg = "Seu login expirou. Favor, faça novo login!"
        this.router.navigate(["/login"]);
      }

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
