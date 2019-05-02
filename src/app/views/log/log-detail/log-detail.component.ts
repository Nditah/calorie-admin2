
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Log } from '../../../models';
import { Logs } from '../../../providers';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
})
export class LogDetailComponent implements OnInit {

  records: Array<Log>;
  record: Log;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public logs: Logs) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.logs.query({ id })[0];
      this.record = record || logs.defaultRecord;
      console.log(record);
    }

  ngOnInit() {
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['log/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`log/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
