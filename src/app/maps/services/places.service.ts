import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse,  } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];

  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);
  
  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() { 
    this.gerUserLocation();
  }

  async gerUserLocation(): Promise<[number, number]>{
    return new Promise((resolve, reject)=> {
      navigator.geolocation.getCurrentPosition( ({ coords }) => {
        this.userLocation = [ coords.longitude, coords.latitude];
      },
      ( err ) => {
        alert('No se puedo obterner la geolocation')
        console.log(err);
        reject();
        
      }
    )
    })
  }

  getPlacesByQuery( query: string = ''){
    
    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.userLocation) throw Error('No hay userLocation')
    this.isLoadingPlaces = true;
    
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params:{
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe( resp => {
      
      this.isLoadingPlaces = false;
      this.places = resp.features;
      this.mapService.createMarkersFromPlaces( this.places, this.userLocation!);
    } )
  }

  deletePlaces(){
    this.places = [];
  }

}
