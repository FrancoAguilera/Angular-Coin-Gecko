import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  BASE = 'https://api.coingecko.com/';
  PATH = 'api/v3/coins/markets?';
  PARAMS =
    'vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const URL = `${this.BASE}${this.PATH}${this.PARAMS}`;
    this.http.get(URL).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
