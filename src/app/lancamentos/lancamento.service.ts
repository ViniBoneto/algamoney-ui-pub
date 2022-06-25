import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './../shared/data.service';
import { Lancamento } from './../core/model';
import { AuthService } from '../shared/auth.service';
import { obterAccessToken } from '../shared/shared.module';
import { environment } from 'src/environments/environment';

/* 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
  Tb cria uma interface do tp LancamentoFiltro, trocando o param filtro de any p/ este tp. Isto serve p/
  "formalizar o contratro" do método e fazer c/ q, caso o usuário fornceça um obj q ñ tenha a prop descr
  (e posteriormente as dts venc tb) como param, seja gerado um erro de compilação, sinalizando ao dev. */
// export interface LancamentoFiltro {

/* 17.5. Implementando a paginação no serviço de lançamentos:
  Adiciona campos pagina e itensPagina ao obj de filtro. Estes campos controlarão o mecanismo de paginação
  de lançamentos no servidor, informando o nº da pág a ser trazida e nº de itens p/ pág de consulta.

P/ podermos iniciar os campos paginação c/ vals pré definidos (0 e 5) mudaremos o tipo do obj filtro de
  interface p/ classe (props de interface ñ podem ter vals iniciados). */
export class LancamentoFiltro {
  descricao?: string;
/* 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
    Vamos adicionar à interface filtro lançamento os campos dataVencimentoDe e dataVencimentoAte, p/ podermos
    implementar o filtro de lanaçamentos por data vencimento max e min, de modo análogo ao q foi feito c/
    descrição. */
  dataVencimentoIni?: Date;
  dataVencimentoFim?: Date;
  // 17.5. Implementando a paginação no serviço de lançamentos:
  pagina: number = 0;
  // itensPagina: number = 5;

  // 17.6. Configurando a paginação lazy do PrimeNG:
  //   Podemos mudar o nº de regs p/ pág de 5 p/ 3, p/ exemp.
  itensPagina: number = 3;
}

/* 17.2. Criando o serviço de consulta de lançamentos:
  Criando um serv http p/ acessar o background (Algamoney-api) e manipular recurso de lançamentos. Aplicando
  aqui o q foi aprendido nos móds 15 (Serviços e injeção de dependências) e 16 (Requisições HTTP). */
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  //  URL base dos servs de lançamentos
  // private lancamentosURL = "http://localhost:8080/lancamentos";

/* 20.1. Configurando a aplicação com environment do Angular CLI:
    Substituindo props, como as URLS dos endpoints do backend, de vals fixos "hard coded" p/ vals dinâmicos,
      obtidos nos arqs de config de ambiente p/ cada ambiente de exec (vide arqs src/environments/environment.ts
      e src/environments/environment.prod.ts). */
  private lancamentosURL: string;

/* 17.12. Criando um serviço de tratamento de erros:
    Vamos mudar a porta do serv de lançamentos p/ uma inválida (3080), p/ se gerar erro e se testar o
    tratamento de erros da app.

  Tb vamos fazer uma segunda simulação de erro, c/ a porta correta, porém um recurso inválido (lanc@ment0s). */
  // private lancamentosURL = "http://localhost:3080/lancamentos";
  // private lancamentosURL = "http://localhost:8080/lanc@ment0s";

  // Injetando o serv HttpClient p/ depend, p/ fazer as reqs http
  // constructor(private http: HttpClient) { }

  // 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
  //   Injeta serv de manipulação de dts, p/ converter os params de dts p/ strs na formatação correta.
  // constructor(private http: HttpClient, private dtServ: DataService) { }

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Injetando serv de auth, p/ obter o token de acesso no backend programaticamente. */
  constructor(private http: HttpClient, private dtServ: DataService, private authServ: AuthService) {
/*  20.1. Configurando a aplicação com environment do Angular CLI:
      Substituindo props, como as URLS dos endpoints do backend, de vals fixos "hard coded" p/ vals dinâmicos,
        obtidos nos arqs de config de ambiente p/ cada ambiente de exec (vide arqs src/environments/environment.ts
        e src/environments/environment.prod.ts). */
    this.lancamentosURL = `${environment.apiUrl}/lancamentos`;
  }

/* Consulta a app background e retorna uma Promise q resolve c/ os lançamentos retornados.
  Aqui estou ainda usando o método Observable.toPromise(), da biblio RXJS, pois na versão
  do NG c/ q este projeto foi criado (12.1.4) ele ainda ñ estava depreciado. Nas versões NG
  >= 13.0, com a depreciação deste, uso outro método da biblio RXJS: firstValueFrom() ou
  lastValueFrom(). */
  // pesquisar(): Promise<any> {

/* 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
    Adiciona um param ao método de pesquisa, contendo os possíveis filtros à consulta de lançamentos. Se
    cada prop de filtro constar no obj filtro (ñ for nula ou undefined), ela será acrescida aos params
    de busca da URL de req GET.

  Primeiramente, só descr lançamento será adicionada, d+ filtros (dts vencs) serão adicionados posteriormente.

  Tb cria uma interface do tp LancamentoFiltro, trocando o param filtro de any p/ este tp. Isto serve p/
    "formalizar o contratro" do método e fazer c/ q, caso o usuário fornceça um obj q ñ tenha a prop descr
    (e posteriormente as dts venc tb) como param, seja gerado um erro de compilação, sinalizando ao dev.
  */
  // pesquisar(filtro: any): Promise<any> {

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
/* Acresce o param resumo à URL p/ obter a versão resumida dos lançamentos (listar resumos). Tb acresce um
    header de autorização do tipo basic, p/ conseguir acessar o recurso no backend. Em dev estamos usando
    autenticação básica. Em prod será usado oauth2.

    19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq
        esta será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/
        a req uma instância local de HttpHeaders onde só o header de auth for passado.
    */
    // let headers: HttpHeaders = new HttpHeaders();

    // É necessário fazer a atribuição abaixo pq os métodos q modificam os headers na vdd criam um clone do
    //   obj original, sendo q este fica inalterado.
    // headers = headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");

/* Como a gestão de recs no backend envolve acesso pré-authorizado aos métodos dos servs, usando a anotação
     Spring @PreAuthorize, q está intrinsicamente ligada ao tipo de segurança oauth2 (verifica escopo perm
     do cli, p/ exemp), ñ funciona usar segurança basic. P/ isto, trocamos p/ tipo oauth2, msm em amb de dev. */
    // headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDIyMDgxMTUsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI2Yjc3NjMzMS1jYjQxLTQzMzUtYTZlYy03MWEwMDc5ZjgzMDEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.glmLOx5PUHG7KEHizfR1xT8sXfuArllUmYfyLN_dh8E");

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Move cód de config de header de auth da req p/ uma func específica, p/ poder ser reutilizado nos d+ métodos
    q farão reqs HTTP. */
    // headers = this.configAuthReq(headers);
    /* 17.20. Implementando o serviço de cadastro de lançamentos:
        Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
        programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
        HttpHeaders p/ Promise<HttpHeaders>.

      19.7. Adicionando o Access Token nas chamadas HTTP:
        Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq
        esta será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/
        a req uma instância local de HttpHeaders onde só o header de auth for passado. */
    // return this.configAuthReq(headers).then(headers => {

      /* 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
            Cria um obj de params http, p/ adiconar os params de filtro de busca (caso constem). Adiciona os params
            ao obj da prop options do método HttpClient.get().  */
          let params = new HttpParams();
          // Tb é necessário fazer a atribuição abaixo, pelo msm motivo do HttpHeaders. A adic do param só será feita
          //  se ele constar no obj filtro.
          if(filtro.descricao)
            params = params.set("descricao", filtro.descricao);

      /*  17.4. Adicionando filtro por datas na pesquisa de lançamentos:
            Adiciona filtros p/ dts min e max de venc, caso existam no obj filtro e sejam válidas. Usa o serv
            de manipulação de dts, p/ converter os params de Date p/ str, na formatação entendida pela API de
            backend ("YYYY-MM-DD"). */
          let dtFiltro: string;

          if(filtro.dataVencimentoIni) {
            // Usando o método DataService.dataParaStr() p/ gerar a str de dt no formato certo. Este método
            //  invoca internamente o obj JS Intl.DateTimeFormat.
            // dtFiltro = this.dtServ.dataParaStr(filtro.dataVencimentoIni);

            // Opcionalmente, pode-se invocar o método DataService.dataParaStrDtPipe() p/ gerar a str de dt no
            //  formato certo. Este método invoca internamente o pipe DatePipe nativo do Angular.
            dtFiltro = this.dtServ.dataParaStrDtPipe(filtro.dataVencimentoIni);
            // console.log(`dataVencimentoDe: ${dtFiltro}`);
            params = params.set("dataVencimentoDe", dtFiltro);
          }

          if(filtro.dataVencimentoFim) {
            // dtFiltro = this.dtServ.dataParaStr(filtro.dataVencimentoFim);

            dtFiltro = this.dtServ.dataParaStrDtPipe(filtro.dataVencimentoFim);
            // console.log(`dataVencimentoAté: ${dtFiltro}`);
            params = params.set("dataVencimentoAte", dtFiltro);
          }

      /*  17.5. Implementando a paginação no serviço de lançamentos:
            Mapeia os campos de paginação do filtro p/ os params de req entendidos pelo mecanismo de paginação
            no servidor (page e size).

          Obs: Como vimos na aula anterior, HttpParams é um componente imutável então precisamos reatribuir seu
            valor quando usarmos o método set. */
          params = params.set("page", filtro.pagina);
          params = params.set("size", filtro.itensPagina);

          // return this.http.get(`${this.lancamentosURL}?resumo`, { headers } /* Equivale a { headers: headers } */)

/*        19.7. Adicionando o Access Token nas chamadas HTTP:
            Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor,
            pq esta será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar
            p/ a req uma instância local de HttpHeaders onde só o header de auth for passado. */
          return this.http.get(`${this.lancamentosURL}?resumo`, { /* headers, */ params } /* Equivale a { headers: headers, params: params } */)
            .toPromise().then(
              // Loga todo o corp de resp (um obj Pageable, pq o backend Spring usa recurso de paginação)
              // (resp) => console.log(resp)

              // Loga apenas o array c/ lançamentos (prop content do corpo de resp)
              // (resp: any) => console.log(resp["content"])

              // Retorna o array de lançamentos como conteúdo da Promise resolvida
              // (resp: any) => {
              //   console.log(`Resposta HTTP\n: ${JSON.stringify(resp)}`);
              //   return resp["content"];
              // }

      /*      17.5. Implementando a paginação no serviço de lançamentos:
                Agora ñ iremos mais retornar apenas a prop content, do obj de resp, q contém o array de lançamentos.
                Vamos precisar tb da prop totalElements, q contém o nº total de lançamentos, p/ o data table do PNG
                poder calcular o nº de págs a exibir e sincronizar sua paginação local c/ a paginação do backend. Então,
                agora retornaremos um obj contendo tanto o array de lançamentos qto o total de lançamentos. */
                (resp: any) => {
                  const lancamentos = resp["content"];

                  const objRet = {
                    // Array de lançamentos
                    lancamentos, /* Equivale a "lancamentos: lancamentos," */
                    // Total de lançamentos
                    total: resp["totalElements"]
                  };

                  return objRet;
                }
          );
    // });
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Criação do método de exclusão de um lançamento, dado o seu cód. Este método invocará o método delete(),
    do serv HttpClient associado ao comp, p/ fazer a req DELETE no backend.

  O retorno será uma Promise<void> pq a req DELETE ñ retornará um corpo. Apenas o header, incluso aí o status
      da operação. */
  excluir(codigo: number): Promise<void> {
    // let headers: HttpHeaders = new HttpHeaders();
    // headers = this.configAuthReq(headers);

    /* 17.20. Implementando o serviço de cadastro de lançamentos:
        Transformando obtenção de auth num acesso din ao serv de auth, p/ obter o token de acesso no backend
        programaticamente. Isso faz com o o cód tenha q ser restrut e o ret do métdodo configAuthReq() mude de
        HttpHeaders p/ Promise<HttpHeaders>.

      19.7. Adicionando o Access Token nas chamadas HTTP:
        Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
          será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
          instância local de HttpHeaders onde só o header de auth for passado.  */
    // return this.configAuthReq(headers).then(headers => {
      return this.http.delete(`${this.lancamentosURL}/${codigo}`/* , { headers } */)
  /*  17.12. Criando um serviço de tratamento de erros:
        Vamos mudar a URL de exclução de lançamentos p/ uma inválida (primeiro ${codigo}xxx e dps ${codigo}234),
        p/ se gerar erro e se testar o tratamento de erros da app.
      Obs: No primeiro caso o erro ret foi 400 e no segundo foi 404. */
      // return this.http.delete(/* `${this.lancamentosURL}/${codigo}xxx` */ `${this.lancamentosURL}/${codigo}234`, { headers })
        .toPromise().then( () => {} );
    // });
  }

  /* 17.20. Implementando o serviço de cadastro de lançamentos:
    Criando método p/ inserir um novo lanç no backend. Este método usa o método HTTP POST p/ enviar o novo lanç
    e retorna uma Promise do tp lançamento, pq o método POST retorna, no corpo da resp, o próprio lanç enviado
    e cadastrado, acrescido de sua ID interna, atribuída na base de dados. O param de entrada será um obj da cls
    de modelo Lancamento. */
  adicionar(lanc: Lancamento): Promise<Lancamento> {
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
    // headers = this.configAuthReqSync(headers);
      // Datas de venc e paggo/receb estão no formato "YYYY-MM-DDTHH:mm:ss.sssZ" mas os tps aceitos no servidor são
      //   LocalDate, q ñ aceitam nem hr e nem TZ. Logo, dts precisam ser convert ao formato "YYYY-MM-DD".
      // console.log(`Lançamento antes conversão datas:\n${JSON.stringify(lanc)}`);
      // lanc.dataPagamento = this.dtServ.dataParaStrDtPipe( new Date(lanc.dataPagamento) );
      // lanc.dataVencimento = this.dtServ.dataParaStrDtPipe( new Date(lanc.dataVencimento) );
      // console.log(`\n---------------------------------------------------------\nLançamento pós conversão datas:\n${JSON.stringify(lanc)}`);

      /* 17.20. Implementando o serviço de cadastro de lançamentos:
        Separa comps das datas antes de submetê-los ao contrutor, p/ driblar erro na instanciação de dts, a partir
        da str (Invalid Date). C/ isso uso o constr de Date q recebe as partes da data individualmente. */
      // console.log(`Lançamento antes conversão datas:\n${JSON.stringify(lanc)}`);
      // this.converterDatas(lanc);
      // console.log(`\n---------------------------------------------------------\nLançamento pós conversão datas:\n${JSON.stringify(lanc)}`);

      // return Promise.resolve(lanc);

      // Podemos utilizar tipagem no método post para que possamos obter a resposta diretamente como Lancamento.
      // return this.http.post<Lancamento>(this.lancamentosURL, lanc, { headers }).toPromise();
      // Como retorno o corpo de resp inalterado, ñ preciso invocar o then() abaixo. Basta retornar a Promise
      //  retornada pelo método toPromise().
        /* .then( (resp) => resp ); */

  /* 17.20. Implementando o serviço de cadastro de lançamentos:
      Seguindo dicas neste post aqui https://app.algaworks.com/forum/topicos/82129/tipo-date , p/ tentar superar o
      erro gerando no p-calendar indicado aqui https://stackoverflow.com/questions/70017960/p-calendar-ngmodel-data-error-error-uncaught-in-promise-unexpected-l */
      return this.http.post<Lancamento>(this.lancamentosURL, Lancamento.toJson(lanc), { headers }).toPromise();
    // });
  }

/* 18.6. Desafio: implementando os serviços de atualização e busca por código:
  Criando método de atualização dum lanç existente. Este será muito semelhante ao método de adição. Porém, ele
  usará o método HTTP PUT em vez do POST. Ele retornará uma Promise q resolverá retornando o lanç atualizado. */
  atualizar(lanc: Lancamento): Promise<Lancamento> {
/*  19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
        instância local de HttpHeaders onde só o header de auth for passado. */
    // let headers: HttpHeaders = new HttpHeaders();

    // return this.configAuthReq(headers).then(headers => {
      return this.http.put<Lancamento>(`${this.lancamentosURL}/${lanc.codigo}`, Lancamento.toJson(lanc)/* , { headers } */)
        .toPromise().then( (lanc) => {
/*        Quando lanç é desserializado, lanc.dataVencimento e lanc.dataPagamento (se ñ nulo) vêm como str.
            Como no tp Lancamento, estas props estão previstas como sendo do tp dt, farei aqui a conversão
            delas de str p/ dt. */
          this.converterStringsParaDatas([lanc]);

          return lanc;
        } );
    //  });
  }

/* 18.6. Desafio: implementando os serviços de atualização e busca por código:
    Criando método de obtenção dum lanç existente, dado seu cód. Ele retornará uma Promise q resolverá retornando
    o lanç, caso exista, ou rejeitará, caso contrário. */
  buscar(codigo: number): Promise<Lancamento> {
/*  19.7. Adicionando o Access Token nas chamadas HTTP:
      Agora ñ há + necessidade de se fzr a auth explicitamente antes de se fzr alguma req ao servidor, pq esta
        será feita de modo transparente pela biblio angular-jwt. Tb ñ há + necessidade de se passar p/ a req uma
        instância local de HttpHeaders onde só o header de auth for passado. */
    // let headers: HttpHeaders = new HttpHeaders();

    // return this.configAuthReq(headers).then(headers => {
      return this.http.get<Lancamento>(`${this.lancamentosURL}/${codigo}`/* , { headers: headers } */ )
        .toPromise().then( (lanc) => {
/*        Quando lanç é desserializado, lanc.dataVencimento e lanc.dataPagamento (se ñ nulo) vêm como str.
            Como no tp Lancamento, estas props estão previstas como sendo do tp dt, farei aqui a conversão
            delas de str p/ dt. */
          this.converterStringsParaDatas([lanc]);

          return lanc;
        } );
    // });
  }

/* 17.8. Excluindo lançamentos e o decorador @ViewChild:
    Move cód de config de header de auth da req p/ uma func específica, p/ poder ser reutilizado nos d+ métodos
    q farão reqs HTTP. */
  private async configAuthReq(headers: HttpHeaders): Promise<HttpHeaders> {
  /* Como a gestão de recs no backend envolve acesso pré-authorizado aos métodos dos servs, usando a anotação
      Spring @PreAuthorize, q está intrinsicamente ligada ao tipo de segurança oauth2 (verifica escopo perm
      do cli, p/ exemp), ñ funciona usar segurança basic. P/ isto, trocamos p/ tipo oauth2, msm em amb de dev. */
    // headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ1MjQwMTE2LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI1ZTRiODA1My04ZDdjLTRkZmItODc3NS1jMzZkNzBhZjNmMDgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.amjpLzRC-qLrFX04frvkvbsCPChflDP69YgEuzDOnpY");

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

  private configAuthReqSync(headers: HttpHeaders): HttpHeaders {
    headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbnNpdHJhZG9yIiwiZXhwIjoxNjQ1ODQ5MDYzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI1NGY3Mjc2MC1jZGQ1LTRhZmItYmE3Mi05ZGQ1NzI3NzZkZWEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.mmXshDVP_rOWg3kkZB0k5AWOlx2Iay8KkXVM6NtXf7A");

    return headers;
  }

/* 17.20. Implementando o serviço de cadastro de lançamentos:
    Separa comps das datas antes de submetê-los ao contrutor, p/ driblar erro na instanciação de dts, a partir
    da str (Invalid Date). C/ isso uso o constr de Date q recebe as partes da data individualmente. */
  private converterDatas(lanc: Lancamento) {
/*     let arrDt = (lanc.dataPagamento) ? this.dtServ.separaData(lanc.dataPagamento) : [];

    if(arrDt.length > 0)
      lanc.dataPagamento = this.dtServ.dataParaStrDtPipe( new Date(arrDt[2], arrDt[1] - 1, arrDt[0]) );
    else
      lanc.dataPagamento = "";

    arrDt = (lanc.dataVencimento) ? this.dtServ.separaData(lanc.dataVencimento) : [];

    if(arrDt.length > 0)
      lanc.dataVencimento = this.dtServ.dataParaStrDtPipe( new Date(arrDt[2], arrDt[1] - 1, arrDt[0]) );
    else
      lanc.dataVencimento = ""; */

    // Voltei os campos de dt do lanç de tp str p/ Date, em + uma tentativa de contornar o erro aqui descrito:
    //  https://app.algaworks.com/forum/topicos/54922/pq-sera-que-estou-recebendo-este-erro-ao-tentar-salvar-usando-o-calendar-sem-o-calendar-esta-funcio
    if(lanc.dataPagamento)
      lanc.dataPagamento = new Date( this.dtServ.dataParaStrDtPipe(lanc.dataPagamento) );

    lanc.dataVencimento = new Date( this.dtServ.dataParaStrDtPipe(lanc.dataVencimento) );
  }

  // 18.6. Desafio: implementando os serviços de atualização e busca por código:
  //   Criando func p/ converter as dada do lanç, q são desserealizadas do backend como str, p/ o tp JS dt.
  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = this.dtServ.strParaData(lancamento.dataVencimento.toString());

      if(lancamento.dataPagamento)
        lancamento.dataPagamento = this.dtServ.strParaData(lancamento.dataPagamento.toString());
    }
  }
}
