  import { Pessoa } from './../core/model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { obterAccessToken } from '../shared/shared.module';

/* 17.7. Desafio: criando a consulta e listagem de pessoas:
  Replicando p/ pessoas o q foi feito p/ lançamentos em aulas anteriores (17.2-17.6): Criando um serv p/
  consultar e gerir recursos de pessoas. */

//  Filtro p/ cunsulta de pessoa
export class PessoaFiltro {
  nome?: string; // Filtra pessoa p/ nome
  // Paginação
  pagina: number = 0; // Nº pág a ser trazida
  itensPagina: number = 3; // Qtd regs p/ pág
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  //  URL base dos servs de pessoas
  private pessoasURL = "http://localhost:8080/pessoas";

  // Injetando o serv HttpClient p/ depend, p/ fazer as reqs http
  // constructor(private http: HttpClient) { }

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Injetando serv de auth, p/ obter o token de acesso no backend programaticamente. */
  constructor(private http: HttpClient, private authServ: AuthService) { }

  // Faz pesquisa de pessoas usando filtro e/ou paginação opcional
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    // Headers HTTP req
    // let headers: HttpHeaders = new HttpHeaders();

    // Autenticação OAuth2
    // headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQyNjMxNjY0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI3Y2YwNWE2ZC03MDI3LTRkNGYtYWY5ZC0xYmRkOTVmYTEyMzIiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.jxX6HjzJ9RtgFQ6d9jGl0XNK-4p3cL2yZo5GfQISOoU");

/* 17.13. Desafio: implementando a exclusão de pessoas:
    Move cód de config de header de auth da req p/ uma func específica, p/ poder ser reutilizado nos d+ métodos
    q farão reqs HTTP. */
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
      // Params HTTP
      let params = new HttpParams();

      // Se filtro nome ou params de paginação válidos foram fornecidos, inclui-os nos params de req
      if(filtro.nome)
        params = params.set("nome", filtro.nome);

      if(filtro.pagina)
        params = params.set("page", filtro.pagina);

      if(filtro.itensPagina)
        params = params.set("size", filtro.itensPagina);

  /*  Faz a req HTTP GET q retorna uma Promise q, em caso de sucesso, resolve p/ a resp À consulta de pessoas
        q é um obj de ret de paginação, contendo, além do array de pessoas, outras props relativos à paginação. */
        return this.http.get(`${this.pessoasURL}`, { /* headers, */ params } /* Equivale a { headers: headers, params: params } */)
          .toPromise().then(
            (resp: any) => {
              const pessoas = resp["content"];

              const objRet = {
                // Array de pessoas
                pessoas, /* Equivale a "pessoas: pessoas," */
                // Total de pessoas
                total: resp["totalElements"]
              };

            return objRet;
          });
    // });
  }

  // Busca todas as pessoas, s/ filtrar ou paginar
  async listar(): Promise<any> {
/*  Faz uma busca padrão pelo 1º elem, p/ verificar o nº tot de elems (prop totalElements) e dps busca
     tds os elems a partir da 1ª pág (pág 0), passando o nº tot de elems como tam da pág (nº de regs p/
     pág). C/ isto, tds os elems serão retornados. Então, resolve a Promise retornando apenas o array de
     pessoas. */
    const filtro: PessoaFiltro = new PessoaFiltro();
    filtro.itensPagina = 1;
    filtro.pagina = 0;

    let totRegs: number,
      objRet;

    objRet = await this.pesquisar(filtro);
    totRegs = objRet.total;

    filtro.itensPagina = totRegs;
    objRet = await this.pesquisar(filtro);

    return objRet.pessoas;
  }

// 17.13. Desafio: implementando a exclusão de pessoas:
//  Cria um método p/ exclusão de pessoas, de modo análogo ao q foi feito c/ lançamentos (aulas 17.8-17.10).
  excluir(codigo: number): Promise<void> {
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

      /*  17.14. Desafio: mensagem de erro de usuário na exclusão de pessoa:
            Vamos adicionar um sufixo 123 ao cód de pessoa, p/ c/ isso, forçar um cód inválido de pessoa, obter um
            retorno 404 e testar se a msg de erro p/ o usr, vinda no corpo de resp, será exibida no comp de msg Toast. */
          // return this.http.delete(`${this.pessoasURL}/${codigo}123`, { headers })

          return this.http.delete(`${this.pessoasURL}/${codigo}`/* , { headers } */)
            .toPromise().then( () => {} );
    // });
  }

/* 17.15. Desafio: implementando a mudança de status de pessoas:
    Vamos implementar o método q atualizará apenas o status de uma pessoa (de ativo p/ inativo ou vice-versa),
    invocando o respectivo método na API de backend. O método HTTP usado será o PUT (p/ ser uma atualização) e
    o corpo de resp conterá apenas um booleano (true p/ ativar pessoa e false p/ desativar). */
  mudarStatus(codigo: number, status: boolean): Promise<void> {
    let headers: HttpHeaders = new HttpHeaders();
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
      return this.http.put(`${this.pessoasURL}/${codigo}/ativo`, status, { headers })
        .toPromise().then( () => {} );
    // });
  }

/* 17.21. Desafio: implementando o cadastro de pessoas:
      Repetindo p/ pessoas o msm q foi feito p/ lanç na aula anteiror (17.20). Isto é, implementando seu cadastro. */
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
/*  19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
        instância local de HttpHeaders onde só o header de auth for passado. */
    // let headers: HttpHeaders = new HttpHeaders();

    // return this.configAuthReq(headers).then(headers => {
      return this.http.post<Pessoa>(this.pessoasURL, pessoa/* , { headers } */).toPromise();

/*  18.15. Desafio: roteamento e edição de pessoas:
      Invoca o método de conversão de tp Pessoa (como tá no frontend) p/ JSON (como tá no backend), devido
      às props nº e cep serem do tp nº na cls de modelo e do tp txt no backend e base dados. */
/*     return this.configAuthReq(headers).then(headers => {
      return this.http.post(this.pessoasURL, Pessoa.toJson(pessoa), { headers })
        .toPromise().then( (pessoa) => Pessoa.fromJson(pessoa) ); */
    // });
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas a impl de atualização e busca p/ cód, como feito p/ lançs na aula 18.6.
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
/*  19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
        instância local de HttpHeaders onde só o header de auth for passado. */
    // let headers: HttpHeaders = new HttpHeaders();

    // return this.configAuthReq(headers).then(headers => {
      return this.http.put<Pessoa>(`${this.pessoasURL}/${pessoa.codigo}`, pessoa/* , { headers } */)
        .toPromise();
    //  });

/*  18.15. Desafio: roteamento e edição de pessoas:
      Invoca o método de conversão de tp Pessoa (como tá no frontend) p/ JSON (como tá no backend), devido
      às props nº e cep serem do tp nº na cls de modelo e do tp txt no backend e base dados. */
 /*    return this.configAuthReq(headers).then(headers => {
      return this.http.put<Pessoa>(`${this.pessoasURL}/${pessoa.codigo}`, Pessoa.toJson(pessoa),
          { headers }).toPromise().then( (pessoa) => Pessoa.fromJson(pessoa) );
        }); */
  }

  // 18.15. Desafio: roteamento e edição de pessoas:
  //   Repetindo c/ pessoas a impl de atualização e busca p/ cód, como feito p/ lançs na aula 18.6.
  buscar(codigo: number): Promise<Pessoa> {
/*  19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
        instância local de HttpHeaders onde só o header de auth for passado. */
    // let headers: HttpHeaders = new HttpHeaders();

    // return this.configAuthReq(headers).then(headers => {
      return this.http.get<Pessoa>(`${this.pessoasURL}/${codigo}`/* , { headers: headers } */ )
        .toPromise();

/*    18.15. Desafio: roteamento e edição de pessoas:
        Invoca o método de conversão de JSON (como vem do backend) p/ tp Pessoa, devido às props nº e cep
        serem do tp nº na cls de modelo e do tp txt no backend e base dados. */
/*       return this.http.get(`${this.pessoasURL}/${codigo}`, { headers: headers } )
        .toPromise().then( (pessoa) => Pessoa.fromJson(pessoa) ); */
    // });
  }

/* 17.13. Desafio: implementando a exclusão de pessoas:
    Move cód de config de header de auth da req p/ uma func específica, p/ poder ser reutilizado nos d+ métodos
    q farão reqs HTTP. */
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
