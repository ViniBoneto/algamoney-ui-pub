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
    if( route.data.roles && !this.auth.temQQPermissao(route.data.roles) ) {
      return this.router.parseUrl("/nao-autorizado");
    }

    return true;
  }

}
