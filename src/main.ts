import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

// NGRX
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { environment } from './environment/environment';
import { routes } from './app/app.routes';
import { messageReducer } from './app/messages/messages.reducer';
import { MessageEffects } from './app/messages/messages.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStore({ messages: messageReducer }),
    provideEffects(MessageEffects),  
    importProvidersFrom(
      MatToolbarModule,
      MatButtonModule,
      MatDialogModule,
      MatIconModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false })
    )
  ]
}).catch(err => console.error(err));
