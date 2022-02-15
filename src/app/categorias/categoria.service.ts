import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* 17.16. Desafio: implementando o serviço de listagem de categorias:
  Criamos um serv de categs, nos msms moldes que foi feito p/ pessoas (PessoaService) e lançamentos (LancamentoService).
  Este serv, no entanto, conterá apenas um método listar(), q listará todas as categs e ñ terá nem filtro e nem
  paginação. */
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categsURL = "http://localhost:8080/categorias";

  constructor(private http: HttpClient) { }

  listar(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.configAuthReq(headers);

    return this.http.get(`${this.categsURL}`, { headers }).toPromise().then(
      (resp: any) => resp
    );
  }

  private configAuthReq(headers: HttpHeaders): HttpHeaders {
    headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ0OTY3MTcwLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI1NmVkZmUzYi1iYjM1LTQ0OGEtODczNS0yZTgzNjExNTc0ZWQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.THozWjNcaribYzgDLohz5UnVz7FR79prFq_40j07kF8");

    return headers;
  }
}
