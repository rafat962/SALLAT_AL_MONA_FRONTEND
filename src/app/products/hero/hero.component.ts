import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import AOS from 'aos';
import { loadModules } from 'esri-loader';
import { NavigationEnd, Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
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
      transition('normal => neww', animate('500ms ease-in-out')),
    ]),
  ],
})
export class HeroComponent implements OnInit, OnDestroy {
  // ----------- esri map
  load() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Fullscreen',
      'esri/widgets/Locate',
      'esri/widgets/Compass',
      'esri/widgets/Home',
      'esri/Graphic',
    ]).then(([Map, MapView, Full, Locate, Compass, Home, Graphic]) => {
      // Create a new map and view
      var map = new Map({ basemap: 'satellite' });
      const mapView = new MapView({
        container: 'viewDiv',
        map: map,
        zoom: 16,
        center: [48.08054884229951, 29.34408639551076],
      });
      // Add other widgets
      const full = new Full({
        view: mapView,
      });
      const locate = new Locate({
        view: mapView,
      });
      const compass = new Compass({
        view: mapView,
      });
      const home = new Home({
        view: mapView,
      });
      mapView.ui.add(full, 'top-right');
      mapView.ui.add(home, 'top-left');
      mapView.ui.add(locate, 'top-right');
      mapView.ui.add(compass, 'bottom-left');
      // grapghic
      var point = {
        type: 'point',
        longitude: 48.08054884229951,
        latitude: 29.34408639551076,
      };
      var markerSymbol = {
        type: 'picture-marker',
        url: '../../../assets/شعار بدون خلفية.webp',
        width: '45px',
        height: '45px',
      };
      var pointGraphic = new Graphic({ geometry: point, symbol: markerSymbol });
      mapView.graphics.add(pointGraphic);
    });
  }
  subscribe!: Subscription;
  constructor(private service: ProductService, private route: Router) {}
  // ----------- get all data
  Zyton_products: any = [];
  offers_products: any = [];
  lbna_products: any = [];
  z3ter_products: any = [];
  mshklat_products: any = [];
  state: string = 'normal';
  api = environment.api;
  // ------ send category

  sendcate(cate: any) {
    this.service.category = cate;

    this.route.navigate(['products/all']);
  }
  ngOnInit() {
    // AI
    const script = document.createElement('script');
    script.onload = () => {
      (window as any).voiceflow.chat.load({
        verify: { projectID: '65fc710cc80f6a28836c9c4a' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
      });
    };
    script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    document.body.appendChild(script);
    //-------
    this.service.header.next('all');
    if (localStorage.getItem('cart')) {
      this.service.bag.next(JSON.parse(localStorage.getItem('cart')!)?.length);
    }
    //---- animation
    setTimeout(() => {
      document.getElementById('texts')?.classList.remove('translate-x-[500px]');
    }, 200);
    setTimeout(() => {
      document.getElementById('main_img')?.classList.add('translate-x-[0px]');
    }, 200);
    setTimeout(() => {
      this.state = 'neww';
    }, 2000);
    //---scroll
    this.route.events.subscribe((evt) => {
      // Check if the event is a NavigationEnd event
      if (evt instanceof NavigationEnd) {
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Use smooth behavior for smooth scrolling
        });
      }
    });
    // --- header
    this.service.header.next('main');
    // --- aos
    AOS.init({
      duration: 800,
      offset: 170,
    });
    // --- esri
    this.load();
    // --- get all data
    this.service.getall('');
    this.subscribe = this.service.getAllProducts().subscribe((data: any) => {
      data.document?.map((element: any) => {
        if (element.category === 'زيت و زيتون') {
          if (this.Zyton_products.length < 4) {
            this.Zyton_products.push(element);
          }
        } else if (element.category === 'لبنة') {
          if (this.lbna_products.length < 6) {
            this.lbna_products.push(element);
          }
        } else if (element.category === 'زعتر') {
          if (this.z3ter_products.length < 6) {
            this.z3ter_products.push(element);
          }
        } else if (element.category === 'مشكلات') {
          if (this.mshklat_products.length < 6) {
            this.mshklat_products.push(element);
          }
        } else if (element.category === 'العروض') {
          this.offers_products.push(element);
        }
      });
    });
    //--------------------
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
}
