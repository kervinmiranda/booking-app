import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { InfoDialogComponent } from 'src/app/shared/dialogs/info-dialog/info-dialog.component';
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
    public dialog: MatDialog,
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
    this.service.getRestaurant(this.idRestaurant).subscribe((result: any) => {
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
    this.booking.turnId = this.bookingForm.get('time').value;
    this.booking.date = this.bookingForm.get('date').value;
    this.booking.person = this.bookingForm.get('customers').value;
  }

  sendBooking() {
    this.setBooking();
    this.service.createReservation(this.booking).subscribe((result: any) => {
      console.log(result.data);
      const title = "Código de Reserva: " + result.data;
      const info = "Necesitarás el código para poder acceder al Restaurant o cancelar la reserva. Por favor guardalo en un lugar seguro";
      this.openDialog(title, info);
    });
  }

  openDialog(title: string, info: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '350px',
      data: {title: title, info: info}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');;
    });
  }

}
