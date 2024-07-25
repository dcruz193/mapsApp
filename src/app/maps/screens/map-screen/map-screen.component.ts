import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';
import { LoadingComponent } from '../../components/loading/loading.component';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { CommonModule } from '@angular/common';
import { AngularLogoComponent } from '../../components/angular-logo/angular-logo.component';
import { BtnMyLocationComponent } from '../../components/btn-my-location/btn-my-location.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-map-screen',
  standalone: true,
  imports: [CommonModule, LoadingComponent, MapViewComponent, AngularLogoComponent,
      BtnMyLocationComponent,SearchBarComponent,
    ],
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.scss'
})
export class MapScreenComponent {

  private placeService = inject( PlacesService );

  get isUserLocationReady(){
    return this.placeService.isUserLocationReady;
  }


}
