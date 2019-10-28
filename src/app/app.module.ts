
/** Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeModule } from 'angular-tree-component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';

/** Components */
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TreeModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    RadioButtonModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
