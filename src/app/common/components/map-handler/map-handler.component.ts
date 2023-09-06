import { Component, OnInit, ViewChild, ElementRef, NgZone, Input, Output, EventEmitter  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BehaviorSubject, Observable, from, forkJoin, of } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';

declare const google;

@Component({
  selector: 'app-map-handler',
  templateUrl: './map-handler.component.html',
  styleUrls: ['./map-handler.component.scss'],
})
export class MapHandlerComponent implements OnInit {
  @ViewChild('mapView', { static: false }) mapViewElement: ElementRef;
  @ViewChild('directionPanel', {static: false}) directionPanel: ElementRef;
  @Input() bookingId: any;
  @Input() bookingLatitude: any;
  @Input() bookingLongitude: any;
  @Input() clientImg: string;
  @Input() providerImg: string;
  @Input() clientName: string;
  @Input() providerName: string;

  @Output() locationUpdate: any = new EventEmitter<any>();
  @Output() enteredArrivalRadius: any = new EventEmitter<boolean>();

  googleMap: any;
  clientMarker: any;
  providerMarker: any;
  clientPosition: any;
  providerPosition = new BehaviorSubject(null);
  geoCoder: any;
  directionsRenderer: any;
  directionsService: any;
  hasDirection = false;

  constructor(
    private zone: NgZone,
    private geolocation: Geolocation,
    private toastSvc: ToastService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);

    const watch = this.geolocation.watchPosition();
    watch.subscribe((geoposition: any) => {
      // console.log(geoposition);
      if (geoposition.coords.latitude && geoposition.coords.longitude) {
        // console.log(geoposition);
        const newPosition = new google.maps.LatLng(geoposition.coords.latitude, geoposition.coords.longitude);
        this.providerPosition.next(newPosition);
        this.locationUpdate.emit({latitude: geoposition.coords.latitude, longitude: geoposition.coords.longitude });
        // this.setMapViewBounds();
        // this.setProviderMarker();
      } else {
        // alert('Geolocation Error!');
        this.toastSvc.showErrorToast('Geolocation Error!');
      }
    });

    this.providerPosition.subscribe((currentValue) => {
      if (currentValue && this.googleMap) {
        // this.loadMap();
        this.setProviderMarker();
        // Check if map has already direction. Don't show direction
        if (!this.hasDirection) {
          this.setMapViewBounds();
          this.setDirection();
        }

        this.computeDistance();
        // console.log(this.directionsService);
        // if(this.go)
      }
    });
  }

  initMap() {
    // prepare locations
    this.clientPosition = new google.maps.LatLng(this.bookingLatitude, this.bookingLongitude);

    const mapOptions = {
      center: this.clientPosition,
      zoom: 10,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      mapTypeControl: false
    };

    const directionRendererOpt = {
      suppressMarkers: true,
    };

    this.directionsRenderer = new google.maps.DirectionsRenderer(directionRendererOpt);
    this.directionsService = new google.maps.DirectionsService();
    this.googleMap = new google.maps.Map(this.mapViewElement.nativeElement, mapOptions);

    this.directionsRenderer.setMap(null);
    this.directionsRenderer.setOptions({polylineOptions: {
      strokeColor: '#FFA07A',
      strokeWeight: '6'
    }});
    this.directionsRenderer.setMap(this.googleMap);
    this.setClientMarker();
    // this.setClientMarker();
  }

  setMapViewBounds() {
    const bound = new google.maps.LatLngBounds();
    bound.extend(this.clientPosition);
    bound.extend(this.providerPosition.value);

    // setTimeout(() => {
    // }, 200);

    this.googleMap.fitBounds(bound);
    this.directionsRenderer.setPanel(this.directionPanel.nativeElement);
  }

  setClientMarker() {
    this.clientMarker = new google.maps.Marker({
      position: this.clientPosition,
      map: this.googleMap,
      icon: 'assets/images/customer-map-icon.png',
      // draggable: true,
      title: 'Pompadour'
    });
  }

  setProviderMarker() {
    if (this.providerMarker) {
      this.providerMarker.setMap(null);
    }

    this.providerMarker = new google.maps.Marker({
      position: this.providerPosition.value,
      map: this.googleMap,
      icon: 'assets/images/provider-map-icon.png',
      // draggable: true,
      title: 'Pompadour'
    });

  }

  setDirection() {
    this.directionsService.route(
      {
        origin: this.providerPosition.value,
        destination: this.clientPosition,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
      },
      (response, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(response);
          this.hasDirection = true;
        } else {
          // alert('Directions request failed due to ' + status);
          this.toastSvc.showErrorToast('Directions request failed due to ' + status);
        }
      }
    );
  }


  computeDistance() {
    const distance: any = google.maps.geometry.spherical.computeDistanceBetween(this.clientPosition, this.providerPosition.value);
    if (distance < 200) {
      this.enteredArrivalRadius.emit(true);
    }
  }

}
