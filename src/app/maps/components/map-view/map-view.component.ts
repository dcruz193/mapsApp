import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent implements AfterViewInit {

  private placesService = inject(PlacesService);
  private mapService = inject( MapService );


  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(){
    console.log(this.placesService.userLocation);
    
  }
  ngAfterViewInit(): void {

    if (!this.mapDivElement.nativeElement) throw Error('No hay placesService');

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation,// starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>

        `);
    
        new Marker({color: 'red'})
          .setLngLat( this.placesService.userLocation || [0,0])
          .setPopup( popup )
          .addTo( map)

    this.mapService.setMap( map )

  }


}
