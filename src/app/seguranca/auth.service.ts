import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

// 19.4. Implementando o serviço de autenticação com OAuth 2
//   Criando cls de serv p/ auth usando protocolo OAuth 2. Registra-o na lst de providers do mód core.
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL p/ req de acesso oauth 2
  oauth2TokenUrl = "http://localhost:8080/oauth/token";
  // 19.16. Implementando o logout:
  //  URL p/ rem do refresh token do oauth 2
  tokensRevokeUrl = "http://localhost:8080/tokens/revoke";
  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   prop q vai armazenar o payload do JWT em formato JSON.
  jwtPayload: any;

  // 19.11. Interceptando chamadas HTTP para tratar a expiração do access token:
  //   Criando método p/ se retornar o token p/ quem precisar, ocultando destes seu modo de armazenamento interno.
  public get accessToken() : string | null {
    return localStorage.getItem("token");
  }

  // Injetando serv de http p/ fzr conn ao servidor, requisitando token oauth 2
  // constructor(private http: HttpClient) { }

/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    Em nosso construtor, na classe AuthService, iremos receber como parametro um JwtHelperService, do pacote
      "@auth0/angular-jwt". Esta classe utilitária servirá p/ decodificar e extrair o payload do JWT.

    Não há diferenças na forma de utilizar essa biblioteca, comparado com o que foi ensinado na aula, as únicas
      diferenças são os tipos dos nossos atributos e de onde vamos importar. Já a forma de decodificar, e como
      armazenar este token, será da mesma maneira da aula. */
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    // O token está sendo mantido no local storage do nav. A cada recarregamento de pág ou reinicio de app, qdo o
    //   comp é reinst, é preciso buscá-lo, decodificá-lo e atribuí-lo à prop corresp.
    this.carregarToken();
  }

  login(usr: string, senha: string): Promise<void> {
    let headers = new HttpHeaders();
    // Usa Content-Type = application/x-www-form-urlencoded, pois com isso no corpo da req se poderá passar
    //  os params no msm formato da query string: param1=val1&param2=val2&param3=val3...
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    // Embora a app use auth do tp oauth 2, a auth p/ obter o token será do tp basic, sendo o token passado
    //  a str com a auth do app (ñ do usr), na forma clientID:secret (no caso, angular:@ngul@r0) codificada
    //  c/ alg Base64.
    headers = headers.append("Authorization", "Basic YW5ndWxhcjpAbmd1bEByMA==");
    // No corpo da req se passa os params no formato de query string
    const body = `client=angular&username=${usr}&password=${senha}&grant_type=password`;
    // O access token virá no corpo da resp, sendo acessível ao app NG. O refresh token (p/ renovar o acess token)
    //  virá num cookie, sendo manipulado e automaticamente enviado apenas pelo browser.
    // return this.http.post(this.oauth2TokenUrl, body, { headers }).toPromise<any>()

    // 19.10. Obtendo um novo access token:
    //   P/ pode receber e enviar cookies ao servidor, o q configura uma situação de CORS (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)
    //     é preciso passar o param withCredentials como true.
    return this.http.post(this.oauth2TokenUrl, body, { headers, withCredentials: true }).toPromise<any>()
      .then(resp => {
        // console.log(resp);

        // 19.5. Decodificando o JWT e armazenando no Local Storage:
        //   Decodifica e armazena o JWT (access token), obtido a partir do corpo da resp, no local storage.
        this.armazenarToken(resp.access_token);
      })
      .catch(err => {
        // console.error(err);

/*      19.6. Tratando casos de erros e sucesso de autenticação:
          Se o status da resp for 400 e o erro for "invalid grant" é pq o usr o senha foram rejeitados. Neste caso,
            ret uma promessa rejeitada c/ str informando o erro de login. Se for qq outra situação de erro, ret uma
            promessa rejeitada repassando o obj da resp de erro. */
        if( err.status === HttpStatusCode.BadRequest) {
          const respJson = err.error;

          if(respJson.error === "invalid_grant")
            return Promise.reject("Usuário ou senha inválido!");
        }

        return Promise.reject(err);
      });
  }

/* 19.9. Exibindo o menu do sistema conforme permissões do usuário:
    A prop jwtPayload do serv AuthService contém o payload do JWT, em formato JSON. No payload há a prop
      authorities q contém um array c/ as perms do usr logado. Vamos usá-la p/ ver as perms do usr e ocultar
      os links p/ as ações q ele ñ tenha auth. A API do backend já bloquearia as ações ñ permitidas pelo usr,
      dando erro no frontend. A omissão dos links é apenas p/ melhorar a usabilidade e evitar q isto ocorra.

    Vamos criar no AuthService um método p/ verificar se o usr logado tem uma determinada permissão, pela maneira
      já prev descr. */
  temPermissao(permissao: string): boolean {
    return this.jwtPayload?.authorities?.includes(permissao);
  }

/* 19.13. Protegendo rotas com guarda de rotas (CanActivate):
    Vamos criar no AuthService um método p/ verificar se o usr logado tem ao menos alguma entre as determinadas
      perms. Este método invocará método pré-existente q já verifica perm do usr, p/ cada perm. */
  temQQPermissao(permissoes: string[]): boolean {
    for (const perm of permissoes) {
      if( this.temPermissao(perm) )
        return true;
    }

    return false;
  }

/* 19.10. Obtendo um novo access token:
    A req p/ um novo access token (refresh token) será direcionada ao msm endpoint da p/ um access token normal
      (pós-login), c/ a diff q entre os params de req será passado apenas o grant_type, q será refresh_token em vez
      de password. O cookie c/ o resfresh token, obtido na resp ao chamado original ao access token será reenviado ao
      servidor e este enviará um novo access token, caso o refresh token ñ esteja expirado tb (neste caso, será
      necesário um novo login). P/ pode receber e enviar cookies ao servidor, o q configura uma situação de CORS
      (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS) é preciso passar o param withCredentials como true. */
  obterNovoAccessToken(): Promise<null> {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization", "Basic YW5ndWxhcjpAbmd1bEByMA==");

    const body = "grant_type=refresh_token";

    return this.http.post(this.oauth2TokenUrl, body, { headers, withCredentials: true }).toPromise<any>()
      .then( (resp) => {
          // Se obteve novo token c/ sucesso, aramzena-o no lugar do expirado
          this.armazenarToken(resp.access_token);
          console.log("Novo access token obtido: ", resp.access_token);
          // Ret uma promessa resolvendo c/ null
          return Promise.resolve(null);
        }
      )
      .catch( (err) => {
        console.error("Erro ao se tentar obter novo access token!", err);
        // Ret uma promessa resolvendo c/ null. Erro de refresh token será tratado posteriormente.
        return Promise.resolve(null);
      } );
  }

/* 19.11. Interceptando chamadas HTTP para tratar a expiração do access token:
    Criando método p/ averiguar se o access token é inválido (inexistente ou já expirou) e se será necessário
      obter outro válido. */
  isAccessTokenInvalido(): boolean {
    const token = this.accessToken;

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  // 19.16. Implementando o logout:
  //   Implementando um método p/ limpar o access token do local storage do nav, como parte do logout.
  limparToken() {
    localStorage.removeItem("token");
    // Tb limpa prop local c/ access token decod
    this.jwtPayload = null;
  }

/* 19.16. Implementando o logout:
    Implementando um método p/ limpar o refresh token do cookie, como parte do logout. Isto é feito invocando
      a URL /token/revoke no backend, q retornará uma resp c/ um cookie vazio, fazendo c/ o refresh token seja
      remov.

    Criação do método logout
      Por termos criado um interceptador genérico para nossas requisições, podemos fazer a implementação do
        método logout no nosso componente auth.service, sem a necessidade de criar um novo componente para
        isso. A razão para que possamos realizar esse procedimento dessa forma é que a única URL que não será
        interceptada pelo nosso método é /oauth/token, logo qualquer outra URL terá um token válido. */
  logout(): Promise<void> {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).toPromise()
      .then(() => {
        // Se remover o refresh token c/ sucesso, limpa tb o access token
        this.limparToken();
      });
  }

  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   Método q decodificará o token e o armazenará na prop do comp, em formato JSON.
  private decodificarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
  }

  // 19.5. Decodificando o JWT e armazenando no Local Storage:
  //   Método q decodificará e armazenará o token no local storage do domínio.
  private armazenarToken(token: string) {
    this.decodificarToken(token);
/*  Qdo armazenamos o JWT payload somente em memória, na prop, ao recarregar-se a pág, a app NG é reiniciada,
      uma nova inst do comp é criada e o payload é perdido (prop é reiniciada indefinida). P/ fzr c/ q a app
      ñ perca token e o usr continue identificado, ao se recarregar a pág, é preciso armazenar o token no local
      storage do nav. */
    localStorage.setItem("token", token);
  }

/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    Carrega o token JWT do local storage do nav. Se este existir, decodifica-o e atribui seu payload, em formato JSON,
      à prop do comp. */
  private carregarToken() {
    const token = localStorage.getItem("token");

    if(token) {
      this.decodificarToken(token);
    }
  }

}
