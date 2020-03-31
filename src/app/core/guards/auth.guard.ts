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

  canActivated(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivatedChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivated(route, state);
  }

  canLoad(route: Router, segments: UrlSegment[]): Observable<boolean> {
    const url = segments.map(s => `/${s}`).join(' ');
    return this.checkAuthState(url).pipe(take(1));
  }

  // Retorna um booleano que informa o se o usuário está autenticado ou não
  private checkAuthState(redirect: string): Observable<boolean> {
    /* Somente o método isAutenticated seria necessário(pois o mesmo já retorna um Observable<boolean> ), mas precisamos bloquear o usuário caso ele não esteja autenticado
    O pipe é o método usado para observable  */
    return this.authService.isAuthenticated.pipe(
      //Tap é um operador do rxjs: é uma função que não manipula ou muda o dado de qualquer jeito, mas podemos usar para enviar alguma coisa. Você pode fazer o que quiser com o dado, mas quando sai da função o dado volta ao estado dele antes da função;
      tap(is => {
        if (!is) {
          this.router.navigate(['/login'], {
            queryParams: { redirect }
          });
        }
      })
    );
  }
}
