import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})

export class HeaderadminComponent implements OnInit {
  isHomePage = false;

  // Inyectamos el AuthService en el constructor
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Verifica si la ruta actual es '/home' para definir `isHomePage`
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home';
    });
  }

  // El método logOut debe estar fuera de ngOnInit()
  logOut() {
    this.authService.logOut();
  }
}