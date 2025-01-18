import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.Service';
import { loadModules } from 'esri-loader';
import { ProductService } from '../../products/products.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
  animations: [
    trigger('divstate', [
      state(
        'normal',
        style({
          opacity: 0,
        })
      ),
      state(
        'new',
        style({
          opacity: 1,
        })
      ),
      transition('normal <=> new', animate(200)),
    ]),
  ],
})
export class SignUpComponent implements OnInit {
  // map
  mapView!: any;
  load() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Fullscreen',
      'esri/widgets/Locate',
      'esri/widgets/Compass',
      'esri/Graphic',
    ]).then(([Map, MapView, Full, Locate, Compass, Graphic]) => {
      // Create a new map and view
      var map = new Map({ basemap: 'satellite' });
      this.mapView = new MapView({
        container: 'viewDiv',
        map: map,
        zoom: 16,
        center: [48.08054884229951, 29.34408639551076],
      });
      // -- get click corr
      this.mapView.on('click', (ev: any) => {
        const point = this.mapView.toMap(ev);
        const longitude = point.longitude;
        const latitude = point.latitude;
        this.myform.patchValue({
          location: `${longitude},${latitude}`,
        });
        if (this.mapView.graphics.length === 0) {
        } else {
          if (this.mapView.graphics.length === 2) {
            addgraphic('new', ev.mapPoint);
          } else if (this.mapView.graphics.length === 4) {
            this.mapView.graphics.removeAll();
            addgraphic('new', ev.mapPoint);
          } else {
            this.mapView.graphics.removeAll();
            addgraphic('new', ev.mapPoint);
          }
        }
      });
      const addgraphic = (type: any, point: any) => {
        const graphic = new Graphic({
          symbol: {
            type: 'simple-marker',
            color: type === 'org' ? 'white' : 'blue',
            size: 8,
          },
          geometry: point,
        });
        this.mapView.graphics.add(graphic);
      };
      // Add other widgets
      const locate = new Locate({
        view: this.mapView,
      });
      locate.on('locate', function (ev: any) {});
      const compass = new Compass({
        view: this.mapView,
      });
      this.mapView.ui.add(locate, 'top-right');
      this.mapView.ui.add(compass, 'bottom-left');
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
      this.mapView.graphics.add(pointGraphic);
    });
  }
  locateCurrentLocation() {
    loadModules(['esri/widgets/Locate']).then(([Locate]) => {
      const locate = new Locate({
        view: this.mapView,
      });

      // Listen for the locate event
      locate.on('locate', (event: any) => {
        // Extract the longitude and latitude from the event
        const { longitude, latitude } = event.position.coords;

        // Update the value of the 'location' form control with the coordinates
        this.myform.patchValue({
          location: `${longitude},${latitude}`,
        });
      });

      // Trigger the locate functionality
      locate.locate();
    });
  }

  myform!: FormGroup;
  state = 'normal';
  constructor(
    private auth: AuthService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.productService.header.next('all');
    //header
    this.productService.header.next('all');
    this.load();
    setTimeout(() => {
      this.state = 'new';
    }, 200);
    this.myform = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.minLength(3), Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.minLength(4), Validators.required],
      }),
      phone: new FormControl('', {
        validators: [Validators.minLength(6), Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.minLength(2)],
      }),
      street: new FormControl('', {
        validators: [Validators.minLength(2)],
      }),
      location: new FormControl('', {
        validators: [Validators.minLength(2)],
      }),
    });
  }

  onsubmit() {
    if (this.myform.valid) {
      this.auth.signup(
        this.myform.value.username,
        this.myform.value.email,
        this.myform.value.password,
        this.myform.value.confirmPassword,
        this.myform.value.phone,
        this.myform.value.city,
        this.myform.value.street,
        this.myform.value.location
      );
    }
  }
}
