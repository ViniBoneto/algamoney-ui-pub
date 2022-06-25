import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/auth.service';
import { obterAccessToken } from '../shared/shared.module';

/* 17.16. Desafio: implementando o serviço de listagem de categorias:
  Criamos um serv de categs, nos msms moldes que foi feito p/ pessoas (PessoaService) e lançamentos (LancamentoService).
  Este serv, no entanto, conterá apenas um método listar(), q listará todas as categs e ñ terá nem filtro e nem
  paginação. */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // private categsURL = "http://localhost:8080/categorias";

/* 20.1. Configurando a aplicação com environment do Angular CLI:
    Substituindo props, como as URLS dos endpoints do backend, de vals fixos "hard coded" p/ vals dinâmicos,
      obtidos nos arqs de config de ambiente p/ cada ambiente de exec (vide arqs src/environments/environment.ts
      e src/environments/environment.prod.ts). */
  private categsURL: string;

  // constructor(private http: HttpClient) { }

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Injetando serv de auth, p/ obter o token de acesso no backend programaticamente. */
  constructor(private http: HttpClient, private authServ: AuthService) {
/*  20.1. Configurando a aplicação com environment do Angular CLI:
      Substituindo props, como as URLS dos endpoints do backend, de vals fixos "hard coded" p/ vals dinâmicos,
        obtidos nos arqs de config de ambiente p/ cada ambiente de exec (vide arqs src/environments/environment.ts
        e src/environments/environment.prod.ts). */
    this.categsURL = `${environment.apiUrl}/categorias`;
  }

  listar(): Promise<any> {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = this.configAuthReq(headers);

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
    programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
    HttpHeaders p/ Promise<HttpHeaders>.

    19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req
        uma instância local de HttpHeaders onde só o header de auth for passado.  */
    // return this.configAuthReq(headers).then(headers => {

      return this.http.get(`${this.categsURL}`/* , { headers } */).toPromise()
      // Como retorno o corpo de resp inalterado, ñ preciso invocar o then() abaixo. Basta retornar a Promise
      //  retornada pelo método toPromise().
/*       .then(
        (resp: any) => resp
      ) */;
    // });
  }

  private async configAuthReq(headers: HttpHeaders): Promise<HttpHeaders> {
    // headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ1ODUxNDc5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI4ODMyZGUxYS04YzdmLTRhMWYtYWMxMi0xMTIxMzc4NGUxZjgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.HuQuN6CNZh3BKqozOP0WjcuJYFNafoyahcSZRV54P1E");

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
    programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
    HttpHeaders p/ Promise<HttpHeaders>.

    19.3. Desafio: módulo de segurança e protótipo da tela de login:
      Remov conn automáticas de auth p/ servidor, feita na aula 17.8. Provisoriamente, a app ñ se conectará ao
      backend e ficará ñ funcional. Ao longo deste mód (19 Segurança do front-end), a forma de conn correta/oficial
      do curso será impl. */
    // let oauth2Token = await obterAccessToken(this.authServ, true);
    // headers = headers.append("Authorization", `Bearer ${oauth2Token}`);

    return headers;
  }
}
