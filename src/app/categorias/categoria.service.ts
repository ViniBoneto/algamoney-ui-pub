import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  private categsURL = "http://localhost:8080/categorias";

  // constructor(private http: HttpClient) { }

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Injetando serv de auth, p/ obter o token de acesso no backend programaticamente. */
  constructor(private http: HttpClient, private authServ: AuthService) { }

  listar(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = this.configAuthReq(headers);

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
    programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
    HttpHeaders p/ Promise<HttpHeaders>. */
    return this.configAuthReq(headers).then(headers => {
      return this.http.get(`${this.categsURL}`, { headers }).toPromise()
      // Como retorno o corpo de resp inalterado, ñ preciso invocar o then() abaixo. Basta retornar a Promise
      //  retornada pelo método toPromise().
/*       .then(
        (resp: any) => resp
      ) */;
    });
  }

  private async configAuthReq(headers: HttpHeaders): Promise<HttpHeaders> {
    // headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ1ODUxNDc5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI4ODMyZGUxYS04YzdmLTRhMWYtYWMxMi0xMTIxMzc4NGUxZjgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.HuQuN6CNZh3BKqozOP0WjcuJYFNafoyahcSZRV54P1E");

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
    programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
    HttpHeaders p/ Promise<HttpHeaders>. */
    let oauth2Token = await obterAccessToken(this.authServ, true);
    headers = headers.append("Authorization", `Bearer ${oauth2Token}`);

    return headers;
  }
}
