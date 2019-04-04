import { Injectable } from '@angular/core';

export enum GetRoutes {
  Home          = 'https://calorie-api.herokuapp.com/api',
  Exercises     = 'https://calorie-api.herokuapp.com/api/exercises',
  Foods         = 'https://calorie-api.herokuapp.com/api/foods',
  Images        = 'https://calorie-api.herokuapp.com/api/images',
  Logs          = 'https://calorie-api.herokuapp.com/api/logs',
  Notifications = 'https://calorie-api.herokuapp.com/api/notifications',
  Settings      = 'https://calorie-api.herokuapp.com/api/settings',
  Setup         = 'https://calorie-api.herokuapp.com/api/setups',
  Users         = 'https://calorie-api.herokuapp.com/api/users',
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
