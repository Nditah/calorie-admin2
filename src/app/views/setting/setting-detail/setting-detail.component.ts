
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting } from '../../../models';
import { Settings } from '../../../providers';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.component.html',
})
export class SettingDetailComponent implements OnInit {

  records: Array<Setting>;
  record: Setting;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public settings: Settings) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      const record = this.settings.query({ id })[0];
      this.record = record;
      console.log(record);
    }

  ngOnInit() {
  }

  // Navigation
  goToAdd(): void {
    this.router.navigate(['setting/add']);
  }

  goToEdit(record: any): void {
    this.router.navigate([`setting/edit/${record.id}`]);
  }

  goBack() {
    window.history.back();
  }

}
