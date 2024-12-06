import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Roles } from '../interfaces/user';  // Importar el tipo o enumeración 'Roles'

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está logueado
  if (!authService.isLoggedIn) {
    router.navigate(["login"]);
    return false;  // El acceso es denegado
  }

  // Obtener el rol requerido desde los datos de la ruta
  const requiredRoles = route.data['roles'] as Roles[] || [];

  // Obtener los roles del usuario actual
  const userRoles = authService.getUserRoles(authService.userData?.email ?? '');

  // Si no hay roles para el usuario o no tiene roles, redirigir a la página de acceso denegado
  if (!userRoles || userRoles.length === 0) {
    router.navigate(['access-denied']);
    return false;
  }

  // Si no se requiere rol específico, permitir el acceso
  if (requiredRoles.length === 0) {
    return true;
  }

  // Convertir los valores de 'Roles' a string para comparar
  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role.toString()));  // Convertir 'role' a string

  if (!hasRequiredRole) {
    router.navigate(['access-denied']);
    return false;  // El acceso es denegado
  }

  // Si el usuario tiene el rol requerido, permitir el acceso
  return true;
};
