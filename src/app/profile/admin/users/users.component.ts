import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private service: ProfileService) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: any[] = [];
  displayedColumns: string[] = [
    'name',
    'email',
    'city',
    'street',
    'phone',
    'location',
    'date',
  ];

  ngOnInit() {
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
          date: el?.user.createdAt,
        };
      });
    });
  }
}
