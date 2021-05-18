import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  headers = {
    'x-rapidapi-key': '2822545084mshd6ae3b6b453d229p1df816jsn1833f1ddad57',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'useQueryString': 'true'
  };
  search: any;
  params = {
    'q': 'projota',
    'limit': '2'
  }

  music = [

  ]

  musicBy = true;
  albumBy = true;

  constructor(private http: HTTP) { }

  ngOnInit() {


  }

  identify(index, item) {
    console.log("entrou");
    return item.name;
  }

  searching() {
    this.musicBy = true;
    this.albumBy = true;

    this.params["q"] = this.search;
    this.params["limit"] = this.params["limit"] == '' ? '2' : this.params["limit"];
    this.http.get("https://deezerdevs-deezer.p.rapidapi.com/search", this.params, this.headers)
      .then(status => {
        this.music = JSON.parse(status.data).data;
        console.log(this.music)

      }).finally()
  }

  searchingByAll() {
    this.musicBy = false;
    
    this.params["q"] = this.search;
    this.params["limit"] = ''
    this.http.get("https://deezerdevs-deezer.p.rapidapi.com/search", this.params, this.headers)
      .then(status => {
        this.music = JSON.parse(status.data).data;
        console.log(this.music)

      }).finally()
  }
  searchingByAllb() {
    
    this.albumBy = false;
    this.params["q"] = this.search;
    this.params["limit"] = ''
    this.http.get("https://deezerdevs-deezer.p.rapidapi.com/search", this.params, this.headers)
      .then(status => {
        this.music = JSON.parse(status.data).data;
        console.log(this.music)

      }).finally()
  }

}
