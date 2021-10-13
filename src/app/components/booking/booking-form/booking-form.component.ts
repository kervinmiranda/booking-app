import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { PaymentService } from 'src/app/services/payment.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
import { Booking } from 'src/app/shared/models/booking-models';
import { Restaurant } from 'src/app/shared/models/restaurant-models';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  public bookingForm;
  public booking = new Booking();
  @Input() restaurant: Restaurant;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: AppService,
    private paymentService: PaymentService,
    private roter: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookingForm = this.fb.group({
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    })
  }

  setBooking() {
    this.booking.restaurantId = this.restaurant.id;
    this.booking.turnId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
    this.booking.name = this.bookingForm.get('name').value;
    this.booking.email = this.bookingForm.get('email').value;
    this.booking.price = this.restaurant.price;
    console.log(this.booking);
  }

  sendBooking() {
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any) => {
      const title = "CÓDIGO DE RESERVA" + result.data;
      const info = "Necesitará el código de reserva para poder acceder al restaurante o cancelar la reserva. Por favor guardalo en un lugar seguro";
      this.openDialog(title, info);
    });
  }

  payBooking() {
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any) => {
      this.paymentService.setBooked({...this.booking, locator: result.data})
      this.roter.navigate(['payment'])
    });
  }

  openDialog(title: string, info: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title: title, info: info}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('this dialog was closed');
    });
  }

  


}
