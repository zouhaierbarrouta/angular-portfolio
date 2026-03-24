import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  // Animated numbers
  expCount: number = 0;
  projectsCount: number = 0;
  techCount: number = 0;

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

    // Numbers animation
    this.animate(5, (v) => this.expCount = v);
    this.animate(10, (v) => this.projectsCount = v);
    this.animate(6, (v) => this.techCount = v);
  }

  private animate(target: number, setter: (val: number) => void): void {
    const duration = 1500;
    const fps = 30;
    const totalFrames = (duration / 1000) * fps;
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const current = Math.floor(target * (frame / totalFrames));
      if (current >= target) {
        setter(target);
        clearInterval(interval);
      } else {
        setter(current);
      }
    }, 1000 / fps);
  }

}
