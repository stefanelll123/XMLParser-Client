import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatCardModule,
    MatButtonToggleModule,
    MatLabel,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule } from '@angular/material';
import { QueryComponent } from './query/query.component';
import { UploadComponent } from './upload/upload.component';
import { XMLViewerDialogComponent } from './query/xml-viewer-dialog/xml-viewer-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './services/spinner.interceptor';

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
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    NgxSpinnerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
  entryComponents: [XMLViewerDialogComponent],
})
export class AppModule { }
