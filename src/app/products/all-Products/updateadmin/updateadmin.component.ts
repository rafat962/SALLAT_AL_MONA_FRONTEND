import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../products.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateadmin',
  templateUrl: './updateadmin.component.html',
  styleUrls: ['./updateadmin.component.css'],
})
export class UpdateadminComponent implements OnInit {
  myform!: FormGroup;
  constructor(
    private http: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductService,
    private roue: Router
  ) {}

  ngOnInit() {
    this.service.getone(this.data.data);
    this.service.getOneProduct().subscribe((data: any) => {
      this.myform?.patchValue({
        name: data.product.name,
        price: data.product.price,
        discount: data.product.discount,
        code: data.product.code,
        category: data.product.category,
        ingredients: data.product.ingredients,
        main_img: data.product.main_img,
        sub_img: data.product.sub_img,
        size: data.product.size,
      });
    });
    this.myform = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
      }),
      price: new FormControl(''),
      size: new FormControl(''),
      main_img: new FormControl(''),
      sub_img: new FormControl(''),
      ingredients: new FormControl(''),
      category: new FormControl(''),
      code: new FormControl(''),
      discount: new FormControl(''),
    });
  }

  onSubmit() {
    // this.http.updatePost(data.title, data.content, data.image, this.postId);
    if (this.myform.valid) {
      const data = {
        name: this.myform.value.name,
        price: this.myform.value.price,
        size: this.myform.value.size,
        ingredients: this.myform.value.ingredients,
        category: this.myform.value.category,
        discount: this.myform.value.discount,
        code: this.myform.value.code,
        main_img: this.myform.value.main_img,
        sub_img: this.myform.value.sub_img,
      };

      this.http.update(this.data.data, data);
    }
  }

  imagePreview!: any;
  onpick(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement?.files[0];

      this.myform.patchValue({ main_img: file });
      this.myform.get('image')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  imagePreviews: string[] = [];
  onSubImgChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.displayImagePreview(files[i]);
    }
    // Handle the files as needed, e.g., set them to a form control
    this.myform.get('sub_img')?.setValue(files);
  }
  displayImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
