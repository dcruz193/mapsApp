import { Component, inject } from '@angular/core';
import { SearchResultComponent } from '../search-result/search-result.component';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ SearchResultComponent, ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;
  private placesServices = inject( PlacesService )

  onQueryChange( query: string = ''){
    
    if (this.debounceTimer) clearTimeout( this.debounceTimer);

    this.debounceTimer = setTimeout(()=> {
      console.log('Mandar este query', query);
      this.placesServices.getPlacesByQuery( query)
    },1000)
    
  }

}
