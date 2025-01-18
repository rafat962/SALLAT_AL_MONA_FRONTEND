import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
const matrials: any = [
  MatTabsModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatSidenavModule,
  MatRippleModule,
  MatDialogModule,
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatBadgeModule,
];

@NgModule({
  imports: [matrials],
  exports: [matrials],
})
export class matrial {}
