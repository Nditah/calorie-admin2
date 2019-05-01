import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { PNotifyService } from './pnotify.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private crudService: CrudService,
    private pNotifyService: PNotifyService,
    private utilsService: UtilsService) { }

}
