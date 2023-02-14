import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productitems',
  templateUrl: './productitems.page.html',
  styleUrls: ['./productitems.page.scss'],
})
export class ProductitemsPage implements OnInit {

  dataRecieved: any;
  Category_id: any;
  Products: any;
  SubProducts: any;
  Title: any;
  size: any;
  subselectedval: any;
  sortselectedval: any;
  private showList: boolean = true;

  Show: boolean = true
  visible: boolean = false

  constructor(public http: HttpClient, public activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.dataRecieved = JSON.stringify(data);
      this.Category_id = data['Category_id'];
      this.Title = data['Title'];
    });
  }

  ngOnInit() {
    //Get All Products
    this.http.get('https://localhost:7068/api/Product/' + this.Category_id + '/GetProducts').subscribe(data => {
      this.Products = data;
      if (this.Products != null) {
        this.size = this.Products.length;
      }
    });

    //Get All Sub Category
    this.http.get('https://localhost:7068/api/Product/' + this.Category_id + '/GeSubCategory').subscribe(data => {
      this.SubProducts = data;
      if (this.Products != null) {
        this.size = this.Products.length;
      }
    });
  }

  //Filter Sub Categories
  OnChange() {
    this.sortselectedval = null;
    if (this.Category_id == this.subselectedval) {
      this.http.get('https://localhost:7068/api/Product/' + this.Category_id + '/GetProducts').subscribe(data => {
        this.Products = data;
        this.size = this.Products.length;
      });
    } else {
      this.http.get('https://localhost:7068/api/Product/' + this.subselectedval + '/GetProductsSubCategory').subscribe(data => {
        this.Products = data;
        this.size = this.Products.length;
      });
    }
  }

  //Filter Sort
  sortProductByPrice() {
    if (this.sortselectedval == 'l2h') {
      this.Products.sort((a: any, b: any) => {
        return b.priceAfterDiscount - a.priceAfterDiscount;
      });
    } else if (this.sortselectedval == 'h2l') {
      this.Products.sort((a: any, b: any) => {
        return a.priceAfterDiscount - b.priceAfterDiscount;
      });
    }
  }

  //singleitem
  gopsingleitem(Product_id: number, Title: any) {
    this.router.navigate(['/tabs/tab2/productitems/singleitem/'], { queryParams: { Product_id, Title } });
  }

  onclick() {
    this.Show = !this.Show; //not equal to condition
    this.visible = !this.visible
  }
}