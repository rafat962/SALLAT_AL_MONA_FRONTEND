import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  myform!: FormGroup;
  myform2!: FormGroup;

  constructor(private http: ProfileService) {}
  name = '';
  email = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  ngOnInit() {
    // ---------- get me ----------
    this.http.getme().subscribe((data: any) => {
      this.name = data.user.name;
      this.email = data.user.email;
      this.myform.patchValue({
        name: this.name,
        email: this.email,
      });
    });
    // ---------- FORM SETTINGS 1 ----------
    this.myform = new FormGroup({
      name: new FormControl(this.name, {
        validators: [Validators.minLength(3)],
      }),
      email: new FormControl(this.email, { validators: [Validators.email] }),
    });
    // ---------- FORM SETTINGS 2 ----------
    this.myform2 = new FormGroup({
      currentPassword: new FormControl(this.currentPassword, {
        validators: [Validators.minLength(3)],
      }),
      newPassword: new FormControl(this.newPassword, {
        validators: [Validators.minLength(3)],
      }),
      confirmPassword: new FormControl(this.confirmPassword, {
        validators: [Validators.minLength(3)],
      }),
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.http.UpdateSettings(this.myform.value.name, this.myform.value.email);
    }
  }

  onSubmit2() {
    this.http.UpdatePassword(
      this.myform2.value.currentPassword,
      this.myform2.value.newPassword,
      this.myform2.value.confirmPassword
    );
  }
}
