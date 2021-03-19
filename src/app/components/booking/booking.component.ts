import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-models';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  public bookingForm;
  public restaurant: Restaurant;
  public booking = new Booking();
  private idRestaurant:number;  

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idRestaurant = Number(this.route.snapshot.paramMap.get('id'));
    this.getRestaurant();
    this.initForm();
  }

  getRestaurant() {
    this.service.getRestaurant(this.idRestaurant ).subscribe((result: any) => {
      this.restaurant = result.data;
      console.log(this.restaurant);
    });
  }

  initForm() {
    this.bookingForm = this.fb.group({
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required]
    })
  }

  setBooking() {
    this.booking.restaurantId = this.idRestaurant;
    this.booking.turnoId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
  }

  sendBooking() {
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any) => {
      console.log(result);
    });
    console.log('Sending Booking', this.bookingForm.get('date').value);
  }

}
