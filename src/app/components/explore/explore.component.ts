import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { LightRestaurant } from 'src/app/shared/models/restaurant-light-model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  public restaurants: LightRestaurant[];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.service.getAllRestaurants().subscribe((result: any) => {
      this.restaurants = result.data;
    })
  }

}
