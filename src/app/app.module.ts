import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CancelBookingComponent } from './components/cancel-booking/cancel-booking.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { BookingFormComponent } from './components/booking/booking-form/booking-form.component';
import { InfoDialogComponent } from './shared/dialogs/info-dialog/info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaymentComponent } from './components/payment/payment.component';
import { MatStepperModule } from '@angular/material/stepper';


const appRoutes: Routes = [
  { path: '', component: ExploreComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'cancel', component: CancelBookingComponent },
  { path: 'payment', component: PaymentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    ExploreComponent,
    CancelBookingComponent,
    HeaderComponent,
    BookingFormComponent,
    InfoDialogComponent,
    PaymentComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
