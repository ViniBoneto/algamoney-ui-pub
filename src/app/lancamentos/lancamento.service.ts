import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
  Tb cria uma interface do tp LancamentoFiltro, trocando o param filtro de any p/ este tp. Isto serve p/
  "formalizar o contratro" do método e fazer c/ q, caso o usuário fornceça um obj q ñ tenha a prop descr
  (e posteriormente as dts venc tb) como param, seja gerado um erro de compilação, sinalizando ao dev. */
export interface LancamentoFiltro {
  descricao: string;
}

/* 17.2. Criando o serviço de consulta de lançamentos:
  Criando um serv http p/ acessar o background (Algamoney-api) e manipular recurso de lançamentos. Aplicando
  aqui o q foi aprendido nos móds 15 (Serviços e injeção de dependências) e 16 (Requisições HTTP). */
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  //  URL base dos servs de lançamentos
  private lancamentosURL = "http://localhost:8080/lancamentos";

  // Injetando o serv HttpClient p/ depend, p/ fazer as reqs http
  constructor(private http: HttpClient) { }

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
    autenticação básica. Em prod será usado oauth2. */
    let headers: HttpHeaders = new HttpHeaders();
    // É necessário fazer a atribuição abaixo pq os métodos q modificam os headers na vdd criam um clone do
    //   obj original, sendo q este fica inalterado.
    // headers = headers.append("Authorization", "Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==");

/* Como a gestão de recs no backend envolve acesso pré-authorizado aos métodos dos servs, usando a anotação
     Spring @PreAuthorize, q está intrinsicamente ligada ao tipo de segurança oauth2 (verifica escopo perm
     do cli, p/ exemp), ñ funciona usar segurança basic. P/ isto, trocamos p/ tipo oauth2, msm em amb de dev. */
    headers = headers.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDE1MjczMjEsInVzZXJfbmFtZSI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMWI1MmMyOC1mMzhkLTQ1Y2YtOTcxYS1iMGU2NWQ0NjZhMTMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.5D9kGHoZ8h9obXswaA2M2ZwPiQ15LgJ7KfBgBObPvUI");

/* 17.3. Adicionando filtro por descrição na pesquisa de lançamentos:
      Cria um obj de params http, p/ adiconar os params de filtro de busca (caso constem). Adiciona os params
      ao obj da prop options do método HttpClient.get().  */
    let params = new HttpParams();
    // Tb é necessário fazer a atribuição abaixo, pelo msm motivo do HttpHeaders. A adic do param só será feita
    //  se ele constar no obj filtro.
    if(filtro.descricao)
      params = params.set("descricao", filtro.descricao);

    // return this.http.get(`${this.lancamentosURL}?resumo`, { headers } /* Equivale a { headers: headers } */)
    return this.http.get(`${this.lancamentosURL}?resumo`, { headers, params } /* Equivale a { headers: headers, params: params } */)
      .toPromise().then(
        // Loga todo o corp de resp (um obj Pageable, pq o backend Spring usa recurso de paginação)
        // (resp) => console.log(resp)

        // Loga apenas o array c/ lançamentos (prop content do corpo de resp)
        // (resp: any) => console.log(resp["content"])

        // Retorna o array de lançamentos como conteúdo da Promise resolvida
        (resp: any) => resp["content"]
    );
  }
}
