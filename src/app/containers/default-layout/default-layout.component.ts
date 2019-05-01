import { Router } from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService, CrudService, GetRoutes, UtilsService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private router: Router,
    private crudService: CrudService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: [ 'class' ]
    });
  }

  ngOnInit() {
    // this.loadData(); 
  }

  loadData() {
    if (!this.utilsService.getLocalStorage('exercises')) {
      this.crudService.get(GetRoutes.Exercises, true)
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
    if (!this.utilsService.getLocalStorage('settings')) {
      this.crudService.get(GetRoutes.Settings, true)
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
    if (!this.utilsService.getLocalStorage('foods')) {
      this.crudService.get(GetRoutes.Foods, true)
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
    if (!this.utilsService.getLocalStorage('users')) {
      this.crudService.get(GetRoutes.Users, true)
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
    if (!this.utilsService.getLocalStorage('logs')) {
      this.crudService.get(GetRoutes.Logs, true)
        .then(data => console.log(data.message))
        .catch(err => console.error(err));
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }
}
