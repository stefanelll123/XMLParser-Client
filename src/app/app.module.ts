import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonToggleModule, MatLabel, MatInputModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatTabsModule, MatDialogModule }  from "@angular/material";
import { QueryComponent } from './query/query.component';
import { UploadComponent } from './upload/upload.component';
import { XMLViewerDialogComponent } from './query/xml-viewer-dialog/xml-viewer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    UploadComponent,
    XMLViewerDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [XMLViewerDialogComponent],
})
export class AppModule { }
