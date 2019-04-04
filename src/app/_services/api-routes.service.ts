import { Injectable } from '@angular/core';

export enum GetRoutes {
  Home          = 'http://localhost:3000/api',
  Exercises     = 'http://localhost:3000/api/exercises',
  Foods         = 'http://localhost:3000/api/foods',
  Images        = 'http://localhost:3000/api/images',
  Logs          = 'http://localhost:3000/api/logs',
  Notifications = 'http://localhost:3000/api/notifications',
  Settings      = 'http://localhost:3000/api/settings',
  Setup         = 'http://localhost:3000/api/setups',
  Users         = 'http://localhost:3000/api/users',
}

@Injectable({
  providedIn: 'root'
})
export class ApiRoutesService {

  constructor() { }

  buildRoute(url: GetRoutes, params: string[]) {
    return `${url}/${params.join('/')}`;
  }
}
