import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { CommonModule } from '@angular/common';
import { MapService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.scss'
})
export class BtnMyLocationComponent {

  private placesService = inject(PlacesService);
  private mapService = inject(MapService);
;

  goToMyLocation(){
    if ( !this.placesService.isUserLocationReady)throw Error('No hay ubicación de usuario');
    if ( !this.mapService.isMapReady)throw Error('No hay mapa disponible');

    this.mapService.flyTo( this.placesService.userLocation || [0,0])

    
  }


}
