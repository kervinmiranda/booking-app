import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/services/app.service';
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
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bookingForm = this.fb.group({
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      customers: ['', Validators.required]
    })
  }

  setBooking() {
    this.booking.restaurantId = this.restaurant.id;
    this.booking.turnoId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
    this.booking.price = this.restaurant.price;
  } 

  sendBooking() {
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any) => {
      console.log(result.data);
      const title = "CÓDIGO DE RESERVA" + result.data;
      const info = "Necesitará el código de reserva para poder acceder al restaurante o cancelar la reserva. Por favor guardalo en un lugar seguro";
      this.openDialog(title, info);
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
