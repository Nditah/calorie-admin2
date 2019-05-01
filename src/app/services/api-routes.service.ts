import { Injectable } from '@angular/core';

export enum GetRoutes {
  Home          = 'http://localhost:5000/api',
  Exercises     = 'http://localhost:5000/api/exercises',
  Foods         = 'http://localhost:5000/api/foods',
  Images        = 'http://localhost:5000/api/images',
  Logs          = 'http://localhost:5000/api/logs',
  Feedbacks     = 'http://localhost:5000/api/feedbacks',
  Nutrients     = 'http://localhost:5000/api/nutrients',
  Settings      = 'http://localhost:5000/api/settings',
  Setup         = 'http://localhost:5000/api/setups',
  Users         = 'http://localhost:5000/api/users',
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
