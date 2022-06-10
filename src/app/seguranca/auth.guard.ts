import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

/* 19.13. Protegendo rotas com guarda de rotas (CanActivate):
  Criando uma guarda de rotas do tp CanActivate, isto é, q aprova ou ñ o ativamento duma determinada rota,
    a depender do ret do método canActivate(). A guarda foi criada c/ o cmd "ng g g seguranca/auth --skip-tests". */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Injeta o serv de auth p/ poder verificar as perms do usr logado. Injetando tb o serv de roteamento p/
  //  redir a nav p/ pág de acesso negado, qdo usr ñ tiver perm p/ rota.
  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Fazendo um tst da guarda: bloqueando a rota p/ pág de novos lançs (evitando q usrs naveguem p/ lá).
    // if(state.url === "/lancamentos/novo")
    //   return false;

/*  Verifica, acessando entre os dados de usr, através do snapshot da próx rota, se o usr tem alguma das
      perms requeridas p/ acessar a rota. Só permite a continuação da nav em caso positivo. Em caso negativo,
      faz redir da nav p/ pág de acesso negado. */
    // if( route.data.roles && !this.auth.temQQPermissao(route.data.roles) ) {
    //   return this.router.parseUrl("/nao-autorizado");
    // }

/*  19.15. Tratando acessos de usuários deslogados na AuthGuard:
      Da maneira como a guarda tá impl, qdo o usr estiver deslogado (isto é, sem access token ou cookie c/ refresh
        token) ele será redir p/ pág de acesso negado, qdo, neste caso, deveria ser redir p/ a pág de login. P/ mudar
        isto, vamos impl uma lógica similar ao do método MoneyHttpInterceptor.intercept(): tentar obter novo access token,
        caso inválido e, se não tiver sucesso, redir p/ login (em vez de gera except). */
    if( this.auth.isAccessTokenInvalido() ) {
      return this.auth.obterNovoAccessToken().then( () => {

        if( this.auth.isAccessTokenInvalido() ) {
          this.router.navigate(["/login"]);
          return false;
        }

        // return true;

/*      19.15. Tratando acessos de usuários deslogados na AuthGuard:
          Na lógica q foi feita originalmente (retornando true), se o usr conseguir um novo access token na
            guarda, ele conseguirá acessar recursos os quais ñ tem perm e ñ acessaria noutro cntxt. P/ remediar
            isto, vamos invocar o método interno AuthGuard._canActivate(), q efetivamente checará as perms do
            usr, p/ q, já c/ o token renovado, elas sejam devidamente testadas. */
        return this._canActivate(route.data.roles);
      } );
    }

    return this._canActivate(route.data.roles);

    // return true;
  }

/* 19.15. Tratando acessos de usuários deslogados na AuthGuard:
    Vamos criar o método interno AuthGuard._canActivate(), q efetivamente checará as perms do usr, p/ ser
      invocado do método público AuthGuard.canActivate(). */
  private _canActivate(permissoes: string[]): boolean | UrlTree {
    if( permissoes && !this.auth.temQQPermissao(permissoes) ) {
      return this.router.parseUrl("/nao-autorizado");
    }

    return true;
  }

}
