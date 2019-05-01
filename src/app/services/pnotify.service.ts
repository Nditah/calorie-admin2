import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable()
export class PNotifyService {
  alert(arg0: { text: any; addClass: string; }): any {
    throw new Error('Method not implemented.');
  }
  getPNotify() {
    // tslint:disable-next-line:no-unused-expression
    PNotifyButtons; // Initiate the module. Important!
    return PNotify;
  }
}
