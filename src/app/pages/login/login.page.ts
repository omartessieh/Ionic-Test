import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: any;
  password: any;
  log: any;
  size: any;

  constructor(public menuCtrl: MenuController, private route: ActivatedRoute, private router: Router, public http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('user_id') != undefined || null) {
      this.router.navigate(['/tabs/tab1']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    if (this.username != null || this.password != null) {

      this.http.get('https://localhost:7068/api/User/' + this.username + '/' + this.password + '/LoginUser').subscribe(data => {
        this.log = data;
        this.size = this.log.length;

        if (this.size != 0) {
          localStorage.setItem("user_id", this.log[0].user_id)
          this.router.navigate(['/tabs/tab1']);
        }

      });

    }
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
  
}
