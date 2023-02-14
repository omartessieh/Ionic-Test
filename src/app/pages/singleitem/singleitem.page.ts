import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-singleitem',
  templateUrl: './singleitem.page.html',
  styleUrls: ['./singleitem.page.scss'],
})
export class SingleitemPage implements OnInit {

  dataRecieved: any;
  Product_id: any;
  Product: any;
  size: any;
  Title: any;

  constructor(public http: HttpClient, public activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((data) => {
      this.dataRecieved = JSON.stringify(data);
      this.Product_id = data['Product_id'];
      this.Title = data['Title'];
    });
  }

  ngOnInit() {
    //Get Single Item
    this.http.get('https://localhost:7068/api/Product/' + this.Product_id + '/GetSingleProduct').subscribe(data => {
      this.Product = data;
      if (this.Product != null) {
        this.size = this.Product.length;
      }
      console.log(this.Product);
    });
  }

}