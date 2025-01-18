import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IncomingordermodelComponent } from './incomingordermodel/incomingordermodel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ordersadmin',
  templateUrl: './ordersadmin.component.html',
  styleUrls: ['./ordersadmin.component.css'],
})
export class OrdersadminComponent implements OnInit {
  constructor(
    private service: ProfileService,
    private toster: ToastrService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'city',
    'street',
    'phone',
    'location',
    'paid',
    'date',
    'totalprice',
    'delete',
    'view',
    'products',
    'id',
  ];
  onDelete(element: any) {
    this.service.deleteorder(element.id).subscribe((data: any) => {
      // --- get all booking
      this.service.getIncominhOrders().subscribe((data: any) => {
        this.dataSource = data.bookings.map((el: any) => {
          return {
            name: el.user?.name,
            email: el.user?.email,
            city: el.user.address?.city,
            street: el.user.address?.street,
            phone: el.user?.phoneNumber,
            location: el.user.location?.coordinates,
            paid: el?.paid,
            date: el?.createdAt,
            totalprice: el?.price,
            products: el?.products,
            id: el?._id,
          };
        });
        this.toster.info('deleted successfully', '', {
          timeOut: 1000,
        });
      });
    });
  }
  onView(element: any) {
    this.dialog.open(IncomingordermodelComponent, {
      data: { data: element.products },
    });
  }
  ngOnInit() {
    // --- get all booking
    this.service.getIncominhOrders().subscribe((data: any) => {
      console.log(data.bookings)
      this.dataSource = data.bookings.map((el: any) => {
        return {
          name: el.user?.name,
          email: el.user?.email,
          city: el.user.address?.city,
          street: el.user.address?.street,
          phone: el.user?.phoneNumber,
          location: el.user.location?.coordinates,
          paid: el?.paid,
          date: el?.createdAt,
          totalprice: el?.price,
          products: el?.products,
          id: el?._id,
        };
      });
    });
  }
  // ------- dialog -------
}
