
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Log, ApiResponse } from '../../../models';
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
    }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.logs.recordRetrieve(`_id=${id}`).then((res: ApiResponse) => {
      if (res.success) {
        const record = res.payload[0];
        this.record = record || this.logs.defaultRecord;
        console.log(record);
      } else {
        console.log(res.message);
      }
    });
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
