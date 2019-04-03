import { Injectable } from '@angular/core';

export enum GetRoutes {
  Home = 'https://ganiru-api.herokuapp.com/api',
  Exercises = 'https://ganiru-api.herokuapp.com/api/exercises',
  Assignments = 'https://ganiru-api.herokuapp.com/api/assignments',
  Banks = 'https://ganiru-api.herokuapp.com/api/banks',
  ContactUs = 'https://ganiru-api.herokuapp.com/api/contact-us',
  Images = 'https://ganiru-api.herokuapp.com/api/images',
  Messages = 'https://ganiru-api.herokuapp.com/api/messages',
  Notifications = 'https://ganiru-api.herokuapp.com/api/notifications',
  Payments = 'https://ganiru-api.herokuapp.com/api/payments',
  Logs = 'https://ganiru-api.herokuapp.com/api/logs',
  Settings = 'https://ganiru-api.herokuapp.com/api/settings',
  Setup = 'https://ganiru-api.herokuapp.com/api/setups',
  Sms = 'https://ganiru-api.herokuapp.com/api/sms',
  Tickets = 'https://ganiru-api.herokuapp.com/api/tickets',
  Foods = 'https://ganiru-api.herokuapp.com/api/foods',
  Users = 'https://ganiru-api.herokuapp.com/api/users',
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
