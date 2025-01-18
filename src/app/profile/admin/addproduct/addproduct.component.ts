import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  myform!: FormGroup;
  constructor(private http: ProfileService) {}

  ngOnInit() {
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

      this.http.createPost(
        data.name,
        data.price,
        data.size,
        data.ingredients,
        data.category,
        data.discount,
        data.code,
        data.main_img,
        data.sub_img
      );
      this.myform.reset();
    }
  }

  imagePreview!: any;
  onpick(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

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

    this.imagePreviews = []; // Clear previous previews
    if (files && files.length > 0) {
      const filesArray: any = Array.from(files);
      for (let i = 0; i < filesArray.length; i++) {
        this.displayImagePreview(filesArray[i]);
      }
      this.myform.patchValue({ sub_img: filesArray });
      this.myform.get('sub_img')?.updateValueAndValidity();
    }
  }
  displayImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}
