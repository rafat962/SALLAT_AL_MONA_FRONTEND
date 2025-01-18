import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../products.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { environment } from '../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { UpdateadminComponent } from './updateadmin/updateadmin.component';
import AOS from 'aos';
@Component({
  selector: 'app-all-Products',
  templateUrl: './all-Products.component.html',
  styleUrls: ['./all-Products.component.css'],
  animations: [
    trigger('divstate', [
      state(
        'normal',
        style({
          opacity: 0,
        })
      ),
      state(
        'neww',
        style({
          opacity: 1,
        })
      ),
      transition('normal <=> neww', animate(400)),
    ]),
  ],
})
export class AllProductsComponent implements OnInit, OnDestroy {
  apiURL = environment.apiUrl;
  api = environment.api;
  state = 'normal';
  user: any = localStorage.getItem('token');

  // main area top
  main_title = 'ORGANIC COCONUT SWEETENERS';
  sub_title =
    'سلة المونة شركة لبيع المنتجات الأردنية والفلسطينية بالكويت حيث رائحة زيت الزيتون تأخذك في رحلة إلي عبق التاريخ وتعود بيكم الي تراث الأجداد.';
  constructor(
    private service: ProductService,
    private roue: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}
  products!: any[];
  lovelist: any = [];
  role = 'user';
  subscription!: Subscription;
  // ---------- CATEGORY
  cate: any = 'كل';
  loading = true;
  ngOnInit() {
    if (localStorage.getItem('cart')) {
      this.service.bag.next(JSON.parse(localStorage.getItem('cart')!)?.length);
    }
    AOS.init({
      duration: 800,
      offset: 170,
    });
    // somoth scroll
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
    // ---------- CATEGORY
    const servicecate = this.service.category;
    if (servicecate) {
      this.cate = servicecate;
      if (this.cate === 'زعتر') {
        this.main_title = 'منتجات الزعتر و السماق';
        this.sub_title =
          'من الأعشاب ذات المذاق المميز للغاية، التي تضفي نكهة شهية للأطعمة المختلفة،، وهو إضافة رائعة مع عناصر غذائية أخرى، كالليمون والثوم والريحان، وبجانب طعمه فإن له فوائد صحية، لما يحتويه من عناصر غذائية عديدة، كمضادات الأكسدة وفيتاميني "أ" و"ج"، ومعادن الحديد والمغنيسيوم والبوتاسيوم والفسفور. تُستخدم أعشاب الزعتر إما طازجة أو مجففة، وما قد لا تعرفينه أن له أنواعًا كثيرة لا تُستعمل كلها في الطهي.';
      } else if (this.cate === 'مكسرات') {
        this.main_title = 'منتجات المكسرات';
        this.sub_title =
          'تعد العديد من المكسرات مصادر جيدة لفيتامين E وفيتامين B2 وحمض الفوليك والألياف والمعادن الأساسية، مثل المغنيسيوم والفوسفور والبوتاسيوم والنحاس والسيلينيوم';
      } else if (this.cate === 'لبنة') {
        this.main_title = 'منتجات اللبنة و الجبنة';
        this.sub_title =
          'تصنع من الحليب أما اللبنة فتصنع من اللبن (الزبادي). صحيح أن الاثنتين تتحدران أصلاً من الحليب ومشتقاته، لكن هناك فوارق جوهرية بينهما، من جهة السعرات وتركيز المكونات الموجودة في كلتيهما';
      } else if (this.cate === 'مجففات و ورقيات') {
        this.main_title = 'منتجات المجففات و الورقيات';
        this.sub_title =
          'كل ما عليك هو ببساطة تصفح التشكيلة الواسعة لأفضل المجففات والورقيات لدينا لاختيار ما يناسبك';
      } else if (this.cate === 'زيت و زيتون') {
        this.main_title = 'منتجات الزيت و الزيتون';
        this.sub_title =
          'هو زيت ناتج من عصر أو ضغط ثمار الزيتون، وهي شجرة تنمو في حوض البحر الأبيض المتوسط؛ يستعمل زيت زيتون في الطبخ والصيدلة والطب، وفي إشعال المواقيد الزيتية وفي الصّابون. زيت الزيتون مستعمل بكثرة لكونه غذاء صحي غني بالدّهون المفيدة والفيتامينات.';
      } else if (this.cate === 'جميد و سمن') {
        this.main_title = 'منتجات الجميد و السمن';
        this.sub_title =
          'الجميد هو لبن مُجفف يُصنع من حليب النعاج. تنتج قدر البادية جميد كركي بجودة عالية, وتعمل على تمكين المجتمع المحلي والحفاظ على الأكلات التراثية. السمن الحيواني أو الدهن الحر (السمن البلدي أو سمن البدو أو السمن العربي) هو دهن مستخرج من لبن الغنم أو البقر بطريقة معينة، ويستخدم في المطبخ ';
      } else if (this.cate === 'مربي و عسل و حلاوة') {
        this.main_title = 'منتجات العسل و المربي و الحلاوة';
        this.sub_title = 'أطعمة فريدة وانواع مختلفة ونكهات مميزة .';
      } else if (this.cate === 'مخلل') {
        this.main_title = 'منتجات المخلل';
        this.sub_title =
          'فوائد المخلل الصحية عديدة، فهو غنى بالفيتامينات مثل فيتامين ك وفيتامين أ، وكذلك المخللات منخفضة السعرات الحرارية وتحتوى على بكتيريا مفيدة.';
      } else if (this.cate === 'خل و دبس') {
        this.main_title = 'منتجات الخل و الدبس';
        this.sub_title =
          'هما منتجات مشهورة في الأسواق العربية، ويستخدمها الكثيرون بشكل متكرر في وصفات الطبخ والحلويات، وعلى الرغم من تشابهما في الطعم الحلو الممزوج بالحموضة، إلا أنهما منتجان مختلفان.';
      } else if (this.cate === 'مشكلات') {
        this.main_title = 'منتجات المشكلات';
        this.sub_title =
          'زيت الزيتون من المواد الحافظة الطبيعية وجميع أصنافنا في زيت الزيتون عصرة أولي ممتاز .';
      } else if (this.cate === 'العروض') {
        this.main_title = 'عروضنا';
        this.sub_title =
          'تابعونا دائما لمعرفة الجديد في عروضنا👌 عروض سلة المونة من أقوي👍 العروض في سوق المنتجات الأردنية والفلسطينية بالكويت ';
      }
    } else {
      this.main_title = 'جميع المنتجات';
    }

    //---------------------------
    // ----- get user
    this.service.me().subscribe((data: any) => {
      this.role = data.user.role;
      this.lovelist = data.user.lovelist;
    });
    //---------
    //header
    this.service.header.next('all');
    //---------
    // --------- get product
    if (servicecate) {
      if (servicecate === 'العروض') {
        this.service.getall(`discount[gt]=0`);
      } else {
        this.service.getall(`category=${this.cate}`);
      }
    } else {
      this.service.getall(``);
    }
    this.subscription = this.service.getAllProducts().subscribe((data: any) => {
      this.products = data.document;
      this.loading = false;
    });
    //--------- ---------
    setTimeout(() => {
      this.state = 'neww';
    }, 300);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.service.category = '';
  }
  //menu
  //-------- products ---------
  category = '';
  name!: string;
  state2 = 'normal';
  // ---------- FILTER ---------
  onSelectChange(selectedValue: any): void {
    this.category = selectedValue.target.value;
    if (this.category === 'كل') {
      this.service.getall('');
      this.main_title = 'جميع المنتجات الشهية';
      this.sub_title = 'جميع المنتجات الشهية';
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    } else if (this.category === 'العروض') {
      this.main_title = 'عروضنا';
      this.sub_title =
        'تابعونا دائما لمعرفة الجديد في عروضنا👌 عروض سلة المونة من أقوي👍 العروض في سوق المنتجات الأردنية والفلسطينية بالكويت ';
      this.service.getall(`discount[gt]=0`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    } else if (this.cate === 'مكسرات') {
      this.main_title = 'منتجات المكسرات';
      this.sub_title =
        'تعد العديد من المكسرات مصادر جيدة لفيتامين E وفيتامين B2 وحمض الفوليك والألياف والمعادن الأساسية، مثل المغنيسيوم والفوسفور والبوتاسيوم والنحاس والسيلينيوم';
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    } else if (this.cate === 'لبنة') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
      this.main_title = 'منتجات اللبنة و الجبنة';
      this.sub_title =
        'تصنع من الحليب أما اللبنة فتصنع من اللبن (الزبادي). صحيح أن الاثنتين تتحدران أصلاً من الحليب ومشتقاته، لكن هناك فوارق جوهرية بينهما، من جهة السعرات وتركيز المكونات الموجودة في كلتيهما';
    } else if (this.cate === 'مجففات و ورقيات') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
      this.main_title = 'منتجات المجففات و الورقيات';
      this.sub_title =
        'كل ما عليك هو ببساطة تصفح التشكيلة الواسعة لأفضل المجففات والورقيات لدينا لاختيار ما يناسبك';
    } else if (this.cate === 'زيت و زيتون') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
      this.main_title = 'منتجات الزيت و الزيتون';
      this.sub_title =
        'هو زيت ناتج من عصر أو ضغط ثمار الزيتون، وهي شجرة تنمو في حوض البحر الأبيض المتوسط؛ يستعمل زيت زيتون في الطبخ والصيدلة والطب، وفي إشعال المواقيد الزيتية وفي الصّابون. زيت الزيتون مستعمل بكثرة لكونه غذاء صحي غني بالدّهون المفيدة والفيتامينات.';
    } else if (this.cate === 'جميد و سمن') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.loading = false;
        this.products = data.document;
      });
      this.main_title = 'منتجات الجميد و السمن';
      this.sub_title =
        'الجميد هو لبن مُجفف يُصنع من حليب النعاج. تنتج قدر البادية جميد كركي بجودة عالية, وتعمل على تمكين المجتمع المحلي والحفاظ على الأكلات التراثية. السمن الحيواني أو الدهن الحر (السمن البلدي أو سمن البدو أو السمن العربي) هو دهن مستخرج من لبن الغنم أو البقر بطريقة معينة، ويستخدم في المطبخ ';
    } else if (this.cate === 'مربي و عسل و حلاوة') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.loading = false;
        this.products = data.document;
      });
      this.main_title = 'منتجات العسل و المربي و الحلاوة';
      this.sub_title = 'أطعمة فريدة وانواع مختلفة ونكهات مميزة .';
    } else if (this.cate === 'مخلل') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.loading = false;
        this.products = data.document;
      });
      this.main_title = 'منتجات المخلل';
      this.sub_title =
        'فوائد المخلل الصحية عديدة، فهو غنى بالفيتامينات مثل فيتامين ك وفيتامين أ، وكذلك المخللات منخفضة السعرات الحرارية وتحتوى على بكتيريا مفيدة.';
    } else if (this.cate === 'خل و دبس') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.loading = false;
        this.products = data.document;
      });
      this.main_title = 'منتجات الخل و الدبس';
      this.sub_title =
        'هما منتجات مشهورة في الأسواق العربية، ويستخدمها الكثيرون بشكل متكرر في وصفات الطبخ والحلويات، وعلى الرغم من تشابهما في الطعم الحلو الممزوج بالحموضة، إلا أنهما منتجان مختلفان.';
    } else if (this.cate === 'مشكلات') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.loading = false;
        this.products = data.document;
      });
      this.main_title = 'منتجات المشكلات';
      this.sub_title =
        'زيت الزيتون من المواد الحافظة الطبيعية وجميع أصنافنا في زيت الزيتون عصرة أولي ممتاز .';
    } else if (this.cate === 'العروض') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
      });
      this.main_title = 'عروضنا';
      this.sub_title =
        'تابعونا دائما لمعرفة الجديد في عروضنا👌 عروض سلة المونة من أقوي👍 العروض في سوق المنتجات الأردنية والفلسطينية بالكويت ';
    } else if (this.cate === 'زعتر') {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
      this.main_title = 'منتجات الزعتر و السماق';
      this.sub_title =
        'من الأعشاب ذات المذاق المميز للغاية، التي تضفي نكهة شهية للأطعمة المختلفة،، وهو إضافة رائعة مع عناصر غذائية أخرى، كالليمون والثوم والريحان، وبجانب طعمه فإن له فوائد صحية، لما يحتويه من عناصر غذائية عديدة، كمضادات الأكسدة وفيتاميني "أ" و"ج"، ومعادن الحديد والمغنيسيوم والبوتاسيوم والفسفور. تُستخدم أعشاب الزعتر إما طازجة أو مجففة، وما قد لا تعرفينه أن له أنواعًا كثيرة لا تُستعمل كلها في الطهي.';
    } else {
      this.service.getall(`category=${this.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    }
  }
  // ---------- SEARCH ---------
  search(search: any) {
    if (search === '') {
      this.service.getall(``);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    } else {
      this.service.getall(`name=${search}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.products = data.document;
        this.loading = false;
      });
    }
  }

  // ---------- LIKE ---------

  love(productID: string, event: any) {
    if (!this.user) {
      this.roue.navigate(['login']);
      this.toastr.info('لإنشاء قائمة العناصر المفضلة يجب عليك انشأ حساب');
    }
    if (event.target.getAttribute('name') === 'love') {
      this.service.unlike(productID).subscribe((data) => {
        this.service.me().subscribe((data: any) => {
          this.lovelist = data.user.lovelist;
          this.toastr.warning('تمت إزالة العنصر من قائمة العناصر المفضلة');
        });
      });
    } else if (event.target.getAttribute('name') === 'not') {
      this.service.like(productID).subscribe((data) => {
        this.service.me().subscribe((data: any) => {
          this.lovelist = data.user.lovelist;
          this.toastr.success('تمت اضافة العنصر الي قائمة العناصر المفضلة');
        });
      });
    }
  }
  // --------- CART ---------
  quan = 1;
  cart: any[] = [];
  deletedI!: any;
  addToCart(id: any) {
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    if (!this.cart) {
      this.cart = []; // Initialize cart to an empty array
    }
    let productData: any;
    for (let x of this.products) {
      if (x._id === id) {
        productData = {
          name: x.name,
          price: x.price,
          size: x.size,
          id: x._id,
          main_img:x.main_img
        };
      }
    }
    const data: any = { product: productData, quantity: this.quan };
    let exist = false;
    for (let x of this.cart) {
      if (id === x.product.id) {
        exist = true;
        this.deletedI = this.cart.indexOf(x);
      }
    }
    if (exist) {
      this.cart.splice(this.deletedI, 1);
      this.cart.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.toastr.info('هذا العنصر موجود بالفعل في السلة');
    } else {
      this.cart.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.toastr.success('تم إضافة المنتج بنجاح');
    }
    this.service.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
  }

  // --------- delete ---------
  delete(id: any) {
    this.service.delete(id);
    this.service.getall(``);
  }

  // --------- update ---------

  update(id: any) {
    const dialogRef = this.dialog.open(UpdateadminComponent, {
      data: { data: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.service.getall(``);
    });
  }
}
