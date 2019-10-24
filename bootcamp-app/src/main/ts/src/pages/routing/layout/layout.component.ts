import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  routeList: RouteList[] = [{ path: '', name: '대시보드' }, { path: 'settings', name: '설정' }];
  constructor(private router: Router) {}

  ngOnInit() {}

  goTo(link: string): void {
    this.router.navigate([link]);
  }
}

interface RouteList {
  path: string;
  name: string;
}
