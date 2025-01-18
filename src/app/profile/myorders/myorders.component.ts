import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { OrdermodelComponent } from './ordermodel/ordermodel.component';
@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  userData: any[] = [];
  orders: any[] = [];
  constructor(
    private ProfileService: ProfileService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.ProfileService.getorders().subscribe((data: any) => {
      this.userData = data.user;
      this.orders = data.user.orders;
    });
    // ------- dialog -------
  }

  // ------- dialog -------

  openDialog(order: any) {
    this.dialog.open(OrdermodelComponent, {
      data: { data: order.products },
    });
  }
}
