import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }
  
  getCategories() {
    return [
      {
        name: "Pizza"
      }, 
      {
        name: "Burger"
      }
    ]
  }

  getAllArticles() {
    [{
      name:"cheeseburger"
    },
    {
      name: "fish burger"
    },
    {
      name: "Cheese Pizza"
    },
    ,
    {
      name: "Pepperoni Pizza"
    },
    {
      name: "Margherita Pizza"
    }]
  }
}
