import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { MsearchComponent } from '../msearch/msearch.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  carousels: any;

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController, public http: HttpClient) { }


  ngOnInit() {
    //Get Carousels
    this.http.get('https://localhost:7068/api/Product/GetCarousels').subscribe(data => {
      this.carousels = data;
    });
    if (localStorage.getItem('user_id') != undefined || null) {
      this.router.navigate(['/tabs/tab1']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  async logout() {
    localStorage.removeItem('user_id');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  //Option Carousels
  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    autoplay: true,
  }

  // logout(){
  //   this.router.navigate(['']);
  // }

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