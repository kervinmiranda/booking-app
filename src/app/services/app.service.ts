import { Injectable } from '@angular/core';
import { LightRestaurant } from '../shared/models/restaurant-light-model';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Booking } from '../shared/models/booking-models';

const API = 'http://localhost:8080/booking-restaurant/v1/';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAllRestaurants() {
    return this.http.get(API + 'restaurants');
  }

  getRestaurant(id: number) {
    return this.http.get(API + 'restaurant' + '/' + id);
  }

  createReservation(booking: Booking) {
    return this.http.post(API + 'reservation', booking);
  }

  cancelReservation(reservationCode: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete(API + 'deleteReservation?Locator='+ reservationCode, options);
  }

  /* getAllRestaurantsMock() {
    const restaurants: LightRestaurant[] = [];

    let restaurant = new LightRestaurant;
    restaurant.address = "Pajaritos 126";
    restaurant.id = 1;
    restaurant.image = "https://b.zmtcdn.com/data/pictures/3/8301893/cb0d462145736846833957e7a4c6a323_featured_v2.jpg";
    restaurant.name = "KFC Pajaritos";


    const restaurant2: LightRestaurant = {
      address: "Pajatiros 4567",
      id: 2,
      image: "https://www.foodretail.es/2020/09/15/horeca/Fachada-restaurante-Burger-King_1474662527_481892_660x372.jpg",
      name: "Burguer King Pajaritos"
    }

    restaurants.push(restaurant);
    restaurants.push(restaurant2);
    return of(restaurants);
  } */
}
