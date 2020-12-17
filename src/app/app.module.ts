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
    FeatureTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
