import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken = 'pk.eyJ1IjoiZGNydXoxOTMiLCJhIjoiY2x4Mm52YzlqMGpiNjJqcGtlbG92MXowZCJ9.k4cRC_pOwiVGieZuoK4v2g';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
