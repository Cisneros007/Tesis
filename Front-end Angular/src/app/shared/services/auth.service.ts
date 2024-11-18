import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; 
  private loggedIn: boolean = false;
  private roles: string[] = [];
  constructor(
    private firebaseAuthenticationService: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // OBSERVER: guarda al usuario en localStorage al iniciar sesión y establece null al cerrar sesión
    this.firebaseAuthenticationService.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // Si el usuario está logueado, obtiene el rol para la redirección
        if (user.email) {
          this.getUserRoles(user.email); // Obtener el rol del usuario
        }
      } else {
        this.userData = null;
        localStorage.removeItem('user'); // Mejor usar removeItem en lugar de 'null'
      }
    });
  }

  // Iniciar sesión con correo y contraseña
  logInWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        alert(error.message);  // Mostrar mensaje de error
      });
  }

  // Iniciar sesión con Google
  logInWithGoogleProvider() {
    return this.firebaseAuthenticationService.signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);  // Mostrar mensaje de error
      });
  }

  // Registrar un nuevo usuario con correo y contraseña
  signUpWithEmailAndPassword(email: string, password: string) {
    return this.firebaseAuthenticationService.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.observeUserState();
      })
      .catch((error) => {
        alert(error.message);  // Mostrar mensaje de error
      });
  }

  // Método que observa el estado del usuario y redirige a la ruta correspondiente según su rol
  observeUserState() {
    this.firebaseAuthenticationService.authState.subscribe((userState) => {
      if (userState) {
        // Redirige según el rol del usuario
        this.router.navigate([this.getRoleRedirect(userState.email ?? '')]);
      }
    });
  }

  // Obtener el rol del usuario según su correo
  getUserRoles(email: string): string {
    const userRoles: { [key: string]: string } = {
      'admin@example.com': 'admin',
      'user@example.com': 'user',
      'empleado@example.com': 'empleado'  ,
      'cisneros@example.com': 'empleado' ,
    };
    return userRoles[email] || 'user';  // Retorna el rol por defecto
  }

  // Obtener la ruta de redirección basada en el rol del usuario
  getRoleRedirect(email: string): string {
    const role = this.getUserRoles(email);
    switch (role) {
      case 'admin':
        return 'admin-dashboard';  // Redirige al dashboard de administrador
      case 'empleado':
        return 'empleado-dashboard';  // Redirige al dashboard de empleado
      default:
        return 'dashboard';  // Redirige al dashboard de usuario (antes 'cliente-dashboard')
    }
  }

  // Verificar si el usuario está logueado
  get isLoggedIn(): boolean {
    return this.userData !== null;  // Usa la propiedad 'userData' en lugar de localStorage
  }

  // Cerrar sesión
  logOut() {
    return this.firebaseAuthenticationService.signOut().then(() => {
      this.userData = null;
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
