import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private nativeAudio: NativeAudio) {}


  play(){
    this.nativeAudio.preloadComplex("soundTest", "../../assets/sounds/audio1.mp3", 1, 1, 0)
                    .then(()=>{this.nativeAudio.loop("soundTest")})
  }

}
