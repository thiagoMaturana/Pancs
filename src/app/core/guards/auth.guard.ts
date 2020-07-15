import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  //O roteador do Angular vai passar automáticamente dois valores para o método: a rota em que estamos atualmente (route: ActivatedRouteSnapshot) e a rota para onde estamos tentando ir na aplicação (state: RouterStateSnapshot).
  //É um guarda de rota do Angular, não um método que criamos;
  canActivated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //retorna se o usuário está autenticado ou não, passando a rota para onde queremos ir;
    return this.checkAuthState(state.url);
  }

  //não tem muita função pra mim
  canActivatedChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivated(route, state);
  }

  // Usado quando precisamos carregar algum módulo de forma assincrona, usando lazyload.
  canLoad(route: Router, segments: UrlSegment[]): Observable<boolean> {
    //Os segments são um array com os segmentos da url. Ex: plantas/create/12, onde cada um é um segmento;
    //Aqui estamos usando o map() (que é um operator que manipula o dados da maneira que quisermos) para percorrer o arrar e colocar uma barra antes de cada segmento: /planta /create /12 e o join(' ) para juntar o array em uma string: plantas/create/12
    const url = segments.map(s => `/${s}`).join(' ');
    //O método checkAuthState() ele não é completado (finalizado) pois ele continua ouvindo, por isso usamos o take(1) para pegarmos apenas 1 valor somente;
    return this.checkAuthState(url).pipe(take(1));
  }

  // Retorna um booleano que informa o se o usuário está autenticado ou não
  private checkAuthState(redirect: string): Observable<boolean> {
    /* Somente o método isAutenticated seria necessário(pois o mesmo já retorna um Observable<boolean> ), mas precisamos bloquear o usuário caso ele não esteja autenticado
    O pipe é o método usado para observable para podermos usar os operadores do rxjs  */
    return this.authService.isAuthenticated.pipe(
      //Tap é um operador do rxjs: é uma função que não manipula ou muda o dado de qualquer jeito, mas podemos usar para enviar alguma coisa. Você pode fazer o que quiser com o dado, mas quando sai da função o dado volta ao estado dele antes da função;
      tap(is => {
        // verifica se ele está autenticado ou não, caso esteja, nada ocorre e caso não esteja ele é redirecionado para a rota "login", queryParams que são parametros colocados no final da url e caso o usuário tenha tentado acessar uma rota sem estar autenticado, ele será redirecionado para a url (redirect) que ele havia tentado após se autenticar
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }
}
