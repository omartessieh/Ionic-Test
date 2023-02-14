import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categories: any;
  size: any;
  limit = 10;
  i: any;

  newssearch: any = [];
  newnewssearch: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController, public http: HttpClient) { }

  ngOnInit() {
    //Get Categories By Limit
    this.http.get('https://localhost:7068/api/Product/' + this.limit + '/GetionicCategories').subscribe(data => {
      this.categories = data;
      this.size = this.categories.length;
    });

    //Get Categories For Search
    this.http.get('https://localhost:7068/api/Product/GetCategories').subscribe(data => {
      this.newssearch = data;
      this.newnewssearch = data;
    });
  }

  //Go To productitems Page With Param
  goproductitems(Category_id: number, Title: any) {
    this.router.navigate(['/tabs/tab2/productitems/'], { queryParams: { Category_id, Title } });
  }

  //Load More Items
  async loadMore(event: any) {
    setTimeout(() => {
      var OldList = this.categories.length;
      var NewParam = OldList + 10;
      this.limit = NewParam;
      this.http.get('https://localhost:7068/api/Product/' + this.limit + '/GetionicCategories').subscribe(data => {
        this.categories = data;
      });
      event.target.complete();
    }, 1000);
  }

  //Swipe Refresh
  handleRefresh(event: any) {
    this.limit = 10;
    setTimeout(() => {
      this.http.get('https://localhost:7068/api/Product/' + this.limit + '/GetionicCategories').subscribe(data => {
        this.categories = data;
        this.size = this.categories.length;
      });
      event.target.complete();
    }, 2000);
  };

  //Search Bar    
  FilterData(ev: any) {
    this.i = 1;
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
      this.i = 0;
      //this.refresh();
    }
  }

}