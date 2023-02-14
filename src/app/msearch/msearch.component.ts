import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-msearch',
  templateUrl: './msearch.component.html',
  styleUrls: ['./msearch.component.scss'],
})
export class MsearchComponent implements OnInit {

  newssearch: any = [];
  newnewssearch: any = [];
  Category_id: any;
  Title: any;
  Product_id: any;

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController, public http: HttpClient) { }

  ngOnInit() {
    //Get Search Data
    this.http.get('https://localhost:7068/api/Product/GetSearch').subscribe(data => {
      this.newssearch = data;
      this.newnewssearch = data;
    });
  }

  //Close Search Modal
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  //Search Bar    
  FilterData(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.newssearch = this.newnewssearch.filter((item: any) => {
        return (
          item.title.toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) > -1
        );
      });
    } else {
      //If Search Bar Empty Get All Search Data
      this.http.get('https://localhost:7068/api/Product/GetSearch').subscribe(data => {
        this.newssearch = data;
      });
    }
  }

  //Go To productitems or singleitem  Page With Parameter
  goto(id: any, title: any, type: any) {
    //debugger;
    console.log(id, title, type);
    if (type == 'Category') {
      var Category_id = id;
      var Title = title;
      this.router.navigate(['/tabs/tab2/productitems/'], { queryParams: { Category_id, Title } });
      //Close Search Modal
      this.dismissModal();
    }
    else {
      var Title = title;
      var Product_id = id;
      this.router.navigate(['/tabs/tab2/productitems/singleitem/'], { queryParams: { Product_id, Title } });
      //Close Search Modal
      this.dismissModal();
    }
  }

}