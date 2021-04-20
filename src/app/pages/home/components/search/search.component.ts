import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchField =  new FormControl()
  results: any[] = [ ]

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.searchField.valueChanges
        .pipe(debounceTime(300))
        .subscribe(query =>{
          this.getData(query)
        })
  }

  private getData(query: string){
    const API = 'tf3iERvp4WWFmXpLyYrmI8V5dXjc9iKw';
    this.http.get(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${API}&limit=12`)
        .pipe(
          map((resp:any) =>{
            return resp.data.map( item => item.images.downsized)
          })
        )
        .subscribe(data => {
          console.log(data);
          this.results = data
        }) 
  }

}
