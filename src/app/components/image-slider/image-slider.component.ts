import { Component, OnInit, OnDestroy, Input } from '@angular/core';

export interface SlideImage {
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() images: SlideImage[] = [];
  @Input() maxScreensToShow: number = 5;

  currentIndex: number = 0;
  previousIndex: number = -1;
  slideInterval: any;
  showAll: boolean = false;

  get slideImages(): SlideImage[] {
    if (this.showAll) {
      return this.images;
    }
    return this.images.slice(0, this.maxScreensToShow);
  }

  constructor() { }

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    if (this.slideImages.length > 1) {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 4000);
    }
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  nextSlide() {
    if (this.slideImages.length > 0) {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex + 1) % this.slideImages.length;
    }
  }

  prevSlide() {
    if (this.slideImages.length > 0) {
      this.previousIndex = this.currentIndex;
      this.currentIndex = (this.currentIndex - 1 + this.slideImages.length) % this.slideImages.length;
    }
  }

  setSlide(index: number) {
    if (this.currentIndex !== index) {
      this.previousIndex = this.currentIndex;
      this.currentIndex = index;
      this.startAutoSlide();
    }
  }

  getSlideClass(index: number): string {
    if (index === this.currentIndex) {
      return 'active';
    }
    if (index === this.previousIndex) {
      return 'outgoing';
    }
    return '';
  }

  toggleShowAll(event: Event) {
    event.preventDefault();
    this.showAll = !this.showAll;
    this.currentIndex = 0;
    this.startAutoSlide();
  }
}
