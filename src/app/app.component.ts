import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private route: ActivatedRoute, private router: Router, private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    if (localStorage.getItem("user_id") != undefined || null) {
      this.router.navigate(['/tabs/tab1']);
    } else {
      this.router.navigate(['/login'])
    }
  }
}