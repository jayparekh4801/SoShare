import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-audio-try',
  templateUrl: './audio-try.component.html',
  styleUrls: ['./audio-try.component.css']
})
export class AudioTryComponent implements OnInit {

  constructor(private sanitizer : DomSanitizer) { }
  audioFile : any;
  // audSrc: SafeUrl | undefined;

  // msbapTitle = 'Audio Title';
  // msbapAudioUrl = 'Online MP3 File URL';
  // msbapDisplayTitle = true;

  ngOnInit(): void {}

  audFileSelected(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e: any) => {
      this.audioFile = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      //   console.log(this.audSrc);
      // this.msbapAudioUrl = event.target.files[0];
      // this.figAudio.nativeElement.src = this.audSrc;
      console.log(this.audioFile)
    }
  }

  // msaapDisplayTitle = true;
  // msaapDisplayPlayList = true;
  // msaapPageSizeOptions = [2, 4, 6];
  // msaapDisplayVolumeControls = true;
  // msaapDisplayRepeatControls = true;
  // msaapDisplayArtist = false;
  // msaapDisplayDuration = false;
  // msaapDisablePositionSlider = true;

  // msaapPlaylist: Track[] = [
  //   {
  //       title: 'Audio One Title',
  //       link: '/Users/jayparekh/Documents/python_programs/eyeexercise.mp3',
  //       artist: 'Artist',
  //       // duration: 'Duration'
  //   }
  // ]
}
