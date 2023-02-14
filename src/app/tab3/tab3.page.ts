import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MsearchComponent } from '../msearch/msearch.component';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import { Preferences} from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  map!: L.Map;
  propertyList = [];
  private modalOpen: boolean = false;
  nlat: any;
  nlon: any;
  alti: any;

  constructor(private modalCtrl: ModalController, private alertController: AlertController) { }

  booleanValue: boolean = false;

  async ngOnInit() {
    //Get LocalStorage Single Value
    const product = await Preferences.get({ key: 'alti' });
  }

  ionViewDidEnter() {

    this.map = L.map('mapId').setView([34.450245, 35.817615], 14);
    this.map.attributionControl.setPrefix('Lebanon');

    this.map.zoomControl.setPosition('bottomright');
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}').addTo(this.map);

    //Fetch Json
    fetch('./assets/data.json')
      .then(res => res.json())
      .then(data => {
        this.propertyList = data.properties;
        console.log(this.propertyList);
      })
      .catch(err => console.error(err));
  }

  //Get Your Location
  async LocationEvent() {
    //If Toggle On
    if (this.booleanValue == true) {
      const coordinates = await Geolocation.getCurrentPosition();
      this.nlat = coordinates.coords.latitude;
      this.nlon = coordinates.coords.longitude;
      this.alti = coordinates.coords.altitude;
      console.log('Current position:', coordinates.coords.latitude, coordinates.coords.longitude);
      console.log(this.booleanValue);

      const icon = L.icon({
        iconUrl: '../../assets/352521_location_on_icon.svg',
        iconSize: [20, 75],
        iconAnchor: [22, 94],
        //shadowAnchor: [4.62],
        popupAnchor: [12, -90]
      });

      L.marker([this.nlat, this.nlon], { icon: icon }).addTo(this.map)
        .bindPopup('Your Location')
        .openPopup();

      var latlng = L.latLng(this.nlat, this.nlon, this.alti);
      this.map.setView(latlng, 20);



      //Add LocalStorage Single Value
      await Preferences.set({ key: 'alti', value: this.nlat });


      //Add LocalStorage Multiple Value

      //Set Alert
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Your Location',
        message: 'latitude' + this.nlat + '  longitude' + this.nlon,
        buttons: ['OK'],
      });

      await alert.present();

    } else {
      //If Toggle Off
      this.map.setView([34.450245, 35.817615], 14);
      this.booleanValue = false;
      this.nlat = null;
      this.nlon = null;
      this.alti = null;
    }
  }

  //Leave Tab Remove Map
  ionViewWillLeave() {
    this.map.remove();
    this.booleanValue = false;
    this.nlat = null;
    this.nlon = null;
    this.alti = null;
  }

  //Button remove
  async remove() {
    //Remove LocalStorage Single Value
    await Preferences.remove({ key: 'alti' });
    this.booleanValue = false;
    this.nlat = null;
    this.nlon = null;
    this.alti = null;
  }

  //Open Search Modal
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MsearchComponent,
      swipeToClose: true,
      backdropDismiss: true,
      mode: 'ios',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      // breakpoints: [0, 0.2, 0.5, 1],
      // initialBreakpoint: 0.2,
      cssClass: 'auto-height'
    });
    await modal.present();
  }

}