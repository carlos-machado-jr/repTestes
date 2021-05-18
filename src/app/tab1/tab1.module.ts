import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { Media } from '@ionic-native/media/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  providers: [ NativeAudio, MusicControls, Media ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
