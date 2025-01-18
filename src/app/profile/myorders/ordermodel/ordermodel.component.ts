import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../../products/products.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../profile.service';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-ordermodel',
  templateUrl: './ordermodel.component.html',
  styleUrls: ['./ordermodel.component.css'],
})
export class OrdermodelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService,
    private roue: Router
  ) {}
  lovelist: any = [];
  api = environment.api;
  ngOnInit() {
    console.log(1);
    console.log(this.data.data);
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
