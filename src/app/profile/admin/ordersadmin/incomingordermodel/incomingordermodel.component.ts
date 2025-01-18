import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../../../products/products.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-incomingordermodel',
  templateUrl: './incomingordermodel.component.html',
  styleUrls: ['./incomingordermodel.component.css'],
})
export class IncomingordermodelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService,
    private roue: Router
  ) {}
  lovelist: any = [];
  api = environment.api;
  ngOnInit() {
    this.roue.events.subscribe((evt) => {
      // Check if the event is a NavigationEnd event
      if (evt instanceof NavigationEnd) {
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Use smooth behavior for smooth scrolling
        });
      }
    });
    this.service.getme().subscribe((data: any) => {
      this.lovelist = data.user.lovelist;
    });
  }
}
