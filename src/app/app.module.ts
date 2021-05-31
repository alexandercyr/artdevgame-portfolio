import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
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
import {MultiSelectModule} from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ColorPickerModule} from 'primeng/colorpicker';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/carousel';


import { ArrowButtonComponent } from './arrow-button/arrow-button.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FiltersComponent } from './filters/filters.component';
import { UiImageComponent } from './project/components/ui-image/ui-image.component';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { ImageCarouselComponent } from './project/components/image-carousel/image-carousel.component';
import { VideoComponent } from './project/components/video/video.component';
import { ProjectInfoComponent } from './project/components/project-info/project-info.component';
import { CtaComponent } from './project/components/cta/cta.component';
import { SimpleButtonComponent } from './simple-button/simple-button.component';
import { SuggestedContentComponent } from './project/components/suggested-content/suggested-content.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ColorFiltersComponent,
    ProjectComponent,
    HeaderUiComponent,
    TagsComponent,
    TagComponent,
    TextBlockComponent,
    FeatureTextComponent,
    PhotoGridComponent,
    BackButtonComponent,
    IconComponent,
    ArrowButtonComponent,
    NavbarComponent,
    FiltersComponent,
    UiImageComponent,
    MultiselectComponent,
    ColorPickerComponent,
    ImageCarouselComponent,
    VideoComponent,
    ProjectInfoComponent,
    CtaComponent,
    SimpleButtonComponent,
    SuggestedContentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    MultiSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    GalleriaModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
