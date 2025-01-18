import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../products/products.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private rou: Router,
    private service: ProductService,
    private location: Location,
    private toster: ToastrService
  ) {}
  where!: string;
  user: any = localStorage.getItem('token');
  num!: number;
  ngOnInit() {
    this.service.bag.subscribe((data: any) => {
      if (data !== 0) {
        this.num = data;
      }
    });
    //header
    this.service.header.subscribe((data: any) => {
      this.where = data;
    });
  }
  openMenu() {
    document.getElementById('menu-icon')?.classList.toggle('open');
    document.getElementById('menu-itmes')?.classList.toggle('scale-y-100');
  }
  goback() {
    this.location.back();
  }
  closeMenu() {
    document.getElementById('menu-icon')?.classList.toggle('open');
    document.getElementById('menu-itmes')?.classList.remove('scale-y-100');
  }
  // -------- logout --------
  logout() {
    localStorage.removeItem('token');
    this.toster.info('Log Out successfully', '', {
      timeOut: 1000,
    });
    this.rou.navigate(['products']);
    this.user = undefined;
  }
  // -------- search --------
  golove() {
    this.rou.navigate(['profile/wishlist']);
  }

  gosearch() {
    this.rou.navigate(['products/all']);
  }
}
