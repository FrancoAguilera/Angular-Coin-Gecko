import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

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

  titles: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    'Market Cap',
    'Total Volume',
  ];

  searchText = '';
  coins: ICoin[] = [];
  filteredCoins: ICoin[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const URL = `${this.BASE}${this.PATH}${this.PARAMS}`;
    this.http.get<ICoin[]>(URL).subscribe(
      (res) => {
        this.coins = res;
        this.filteredCoins = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchCoin() {
    this.filteredCoins = this.coins.filter(
      (coin) =>
        coin.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()) ||
        coin.symbol
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase())
    );
  }
}
