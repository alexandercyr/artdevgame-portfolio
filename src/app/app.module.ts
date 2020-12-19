import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { ColorFiltersComponent } from './color-filters/color-filters.component';
import { ProjectComponent } from './project/project.component';
import { HeaderUiComponent } from './header-ui/header-ui.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tag/tag.component';
import { TextBlockComponent } from './project/components/text-block/text-block.component';
import { FeatureTextComponent } from './project/components/feature-text/feature-text.component';
import { PhotoGridComponent } from './project/components/photo-grid/photo-grid.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    ColorFiltersComponent,
    ProjectComponent,
    HeaderUiComponent,
    TagsComponent,
    TagComponent,
    TextBlockComponent,
    FeatureTextComponent,
    PhotoGridComponent,
    BackButtonComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
