import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
   title: string;
    icon: string;
   class: string;
     sub: any[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',             title: 'Dashboard',                   icon: 'design_app',                     class: '', sub: null },
    { path: '/user',                  title: 'Users',                       icon: 'users_circle-08',                class: '', sub: null },
    { path: '/exercise',              title: 'Exercise',                    icon: 'sport_user-run',                 class: '', sub: null },
    { path: '/notification',          title: 'Notification',                icon: 'design-2_ruler-pencil',          class: '', sub: null },
    { path: '/food',                  title: 'Food',                        icon: 'shopping_delivery-fast',         class: '', sub: null  },
    { path: '/image',                 title: 'Image',                       icon: 'business_badge',                 class: '', sub: null  },
    { path: '/log',                   title: 'Log',                         icon: 'files_single-copy-04',           class: '', sub: null  },
    { path: '/nutrient',              title: 'Nutrient',                    icon: 'business_bank',                  class: '', sub: null  },
    { path: '/setting',               title: 'Setting',                     icon: 'ui-1_settings-gear-63',          class: '', sub: null  },
    { path: '/setup',                 title: 'Setup',                       icon: 'loader_refresh',                 class: '', sub: null  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
}
