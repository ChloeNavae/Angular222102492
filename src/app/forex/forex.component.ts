import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { formatCurrency } from '@angular/common';

declare const $ : any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css'
})
export class ForexComponent implements AfterViewInit {
  private _table1 : any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    this._table1 = $("#table1").DataTable({
      "columnDefs" : [
        {
          "targets" : 2,
          "className" : "text-right"
        }
      ]
    });

    this.bindTable1();
  }

  bindTable1(): void {
    console.log("getData()");

    var url = "https://openexchangerates.org/api/latest.json?app_id=0c1302314b7d46e2bdd1bcb872195a62";

    this.httpClient.get(url).subscribe((data : any) => {
      //console.log(data);
      var rates = data.rates;
      console.log(rates);

      var idr = rates.IDR;
      var idr2 = formatCurrency(idr, "en-US", "", "USD");
      var row = [ 1, "USD", idr2 ];
      this._table1.row.add(row);

      var sgd = rates.IDR / rates.SGD;
      var sgd2 = formatCurrency(sgd, "en-US", "", "SGD");
      var row = [ 2, "SGD", sgd2 ];
      this._table1.row.add(row);

      var bnd = rates.IDR / rates.BND;
      var bnd2 = formatCurrency(bnd, "en-US", "", "BND");
      var row = [ 3, "BND", bnd2 ];
      this._table1.row.add(row);

      var hkd = rates.IDR / rates.HKD;
      var hkd2 = formatCurrency(hkd, "en-US", "", "HKD");
      var row = [ 4, "HKD", hkd2 ];
      this._table1.row.add(row);

      var btc = rates.IDR / rates.BTC;
      var btc2 = formatCurrency(btc, "en-US", "", "BTC");
      var row = [ 5, "BTC", btc2 ];
      this._table1.row.add(row);

      var zmw = rates.IDR / rates.ZMW;
      var zmw2 = formatCurrency(zmw, "en-US", "", "ZMW");
      var row = [ 6, "ZMW", zmw2 ];
      this._table1.row.add(row);

      var mmk = rates.IDR / rates.MMK;
      var mmk2 = formatCurrency(mmk, "en-US", "", "MMK");
      var row = [ 7, "MMK", mmk2 ];
      this._table1.row.add(row);

      var btc = rates.IDR / rates.BTC;
      var btc2 = formatCurrency(btc, "en-US", "", "BTC");
      var row = [ 8, "BTC", btc2 ];
      this._table1.row.add(row);

      var jpy = rates.IDR / rates.JPY;
      var jpy2 = formatCurrency(jpy, "en-US", "", "JPY");
      var row = [ 9, "JPY", jpy2 ];
      this._table1.row.add(row);

      var cny = rates.IDR / rates.CNY;
      var cny2 = formatCurrency(cny, "en-US", "", "CNY");
      var row = [ 10, "CNY", cny2 ];
      this._table1.row.add(row);

      this._table1.draw(false);
    })
  }

}
