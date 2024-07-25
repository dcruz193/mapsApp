import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { CommonModule } from '@angular/common';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {

  private placesServices = inject( PlacesService);
  private mapService = inject( MapService);

  selectedId: string = '';

  get isLoadingPlaces(): boolean{
    return this.placesServices.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placesServices.places;
  }

  flyTo( place: Feature){
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getDirections( place: Feature){

    if( !this.placesServices.userLocation) throw Error('No hay userLocation')
    this.placesServices.deletePlaces();
    const start = this.placesServices.userLocation;
    const end = place.center as [number, number];

    this.mapService.getRouterBetweenPoints( start, end);

  }

}
