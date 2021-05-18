import { Component } from '@angular/core';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title: any = 'Ed Sheeran'
  artist: any;
  image: string = '../../assets/images/album.jpg';
  filename: any = 'Shape of You';
  duration: any = -1;
  curr_playing_file: MediaObject;
  storageDirectory: any;
  play_The_track: string = "../../assets/sounds/audio1.mp3"; //note this specific url format is used in android only
  position: any = 0;
  get_position_interval: any;
  is_playing = false;
  is_in_play = false;
  is_ready = false;
  get_duration_interval: any;
  display_position: any = '00:00';
  display_duration: any = '00:00';

  // https://connect.deezer.com/oauth/auth.php?app_id=479922&redirect_uri=http://app.axdeveloper.com.br/401.shtml&perms=basic_access,machadopnn@gmail.com

  //code : frf51e24e867a39970bfec961f043536

  //https://connect.deezer.com/oauth/access_token.php?app_id=479922&secret=c5caf8e48c60c23f04ce91945efb71de&code=frf51e24e867a39970bfec961f043536


  // acessToken : frzF8fH4lHg14MGvMms7vnScBBxibhTFGuO2NVa0w9BzcdUR5dD

  constructor(
    private sound: Media,
    private platform: Platform
  ) { }



  ngOnInit() {
    // comment out the following line when adjusting UI in browsers
    this.prepareAudioFile();
  }

  prepareAudioFile() {
    this.platform.ready().then((res) => {
      this.getDuration();
    });
  }


  ngDoCheck() {

  }

  getDuration() {

    this.curr_playing_file = this.sound.create(this.play_The_track);

    this.curr_playing_file.play();
    this.curr_playing_file.setVolume(0.0);


    const self = this;
    let temp_duration = self.duration
    this.get_duration_interval = setInterval(() => {

      if (self.duration === -1 || !self.duration) {
        self.duration = ~~(self.curr_playing_file.getDuration());


      } else {

        if (self.duration !== temp_duration) {
          temp_duration = self.duration;
        } else {
          self.curr_playing_file.stop();
          self.curr_playing_file.release();

          clearInterval(self.get_duration_interval);
          this.display_duration = this.toHHMMSS(self.duration);
          self.setToPlayback();
        }
      }
    }, 100)


  }


  setToPlayback() {
    this.curr_playing_file = this.sound.create(this.play_The_track);
    this.curr_playing_file.onStatusUpdate.subscribe(status => {
      switch (status) {
        case 1:
          break;
        case 2:   // 2: playing
          this.is_playing = true;
          break;
        case 3:   // 3: pause
          this.is_playing = false;
          break;
        case 4:   // 4: stop
        default:
          this.is_playing = false;
          break;
      }
    });
    this.is_ready = true;
    this.getAndSetCurrentAudioPosition();
  }


  getAndSetCurrentAudioPosition() {
    const diff = 1;
    const self = this;
    this.get_position_interval = setInterval(() => {
      const last_position = self.position;
      self.curr_playing_file.getCurrentPosition().then((position) => {

        if (position >= 0 && position < self.duration) {
          if (Math.abs(last_position - position) >= diff) {
            // set position
            self.curr_playing_file.seekTo(last_position * 1000);

          } else {
            // update position for display
            self.position = position;
            this.display_duration = this.toHHMMSS(self.duration - self.position);

            this.display_position = this.toHHMMSS(self.position);
          }
        } else if (position >= self.duration) {
          self.stop();
          self.setToPlayback();
        }
      });
    }, 100);
  }
  controlSeconds(action) {
    const step = 5;
    const numberRange = this.position;
    switch (action) {
      case 'back':
        this.position = numberRange < step ? 0.001 : numberRange - step;
        break;
      case 'forward':
        this.position = numberRange + step < this.duration ? numberRange + step : this.duration;
        break;
      default:
        break;
    }
  }
  play() {
    this.curr_playing_file.play();
  }

  pause() {
    this.curr_playing_file.pause();
  }

  stop() {
    this.curr_playing_file.stop();
    this.curr_playing_file.release();
    clearInterval(this.get_position_interval);
    this.position = 0;
  }

  toHHMMSS(secs) {

    var sec_num = parseInt(secs, 10)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i >= 0)
      .join(":")


  }

  ngOnDestroy() {
    this.stop();
  }
}
