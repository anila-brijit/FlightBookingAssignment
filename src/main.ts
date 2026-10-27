// Bootstrap the standalone Angular application.
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Start the app with its router and other application-level providers.
bootstrapApplication(AppComponent, appConfig).catch((error: unknown) => {
  console.error('Application bootstrap failed.', error);
});
