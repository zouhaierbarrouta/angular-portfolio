import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;
    if (video) {
        // Force muted before anything else
        video.muted = true;
        
        // Listen for when video is ready to ensure it plays
        video.oncanplay = () => {
            video.play().catch(error => {
                console.log("Autoplay failed even after canplay event:", error);
            });
        };

        // Explicit Loop backup
        video.onended = () => {
            video.currentTime = 0;
            video.play();
        };

        // Fallback: Try playing after a small delay anyway
        setTimeout(() => {
            if (video.paused) {
                video.play().catch(() => {});
            }
        }, 300);
    }
  }

}
