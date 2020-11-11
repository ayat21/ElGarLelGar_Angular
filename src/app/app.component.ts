import { Component } from '@angular/core';
import { User } from './Models/user';
import { Router } from '@angular/router';
import { Role } from './Models/role';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ElGarLelGar';
  currentUser: User;

  constructor(
      private router: Router,
      private authenticationService: LayoutService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.Role == Role.Admin;
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
 
}
