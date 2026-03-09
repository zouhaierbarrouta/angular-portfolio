import { Component, OnInit, OnDestroy } from '@angular/core';

interface ExperienceShowcase {
  id: string;
  images: { url: string; title: string; description: string; }[];
  currentIndex: number;
  slideInterval?: any;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  showcases: { [key: string]: ExperienceShowcase } = {
    'kian': {
      id: 'kian',
      images: [
        {
          url: 'assets/images/smart-construction/smart construction.png',
          title: 'Smart Construction Suite',
          description: 'IoT integration and management dashboards'
        }
      ],
      currentIndex: 0
    },
    'addinn': {
      id: 'addinn',
      images: [
        {
          url: 'assets/images/smart claim/Capture 1.PNG',
          title: 'Smart Claim - Dashboard',
          description: 'Insurance claims management dashboard'
        },
        {
          url: 'assets/images/smart claim/Capture 2.PNG',
          title: 'Smart Claim - Claims List',
          description: 'Overview of all insurance claims'
        },
        {
          url: 'assets/images/smart claim/Capture 3.PNG',
          title: 'Smart Claim - Details',
          description: 'Detailed view of a specific claim'
        },
        {
          url: 'assets/images/smart claim/Capture 4.PNG',
          title: 'Smart Claim - Reports',
          description: 'Analytics and reporting interface'
        },
        {
          url: 'assets/images/smart claim/Capture 5.PNG',
          title: 'Smart Claim - Document Flow',
          description: 'Managing document workflows and processing'
        },
        {
          url: 'assets/images/smart claim/Capture 6.PNG',
          title: 'Smart Claim - Progression',
          description: 'Tracking claim status and history'
        },
        {
          url: 'assets/images/smart claim/Capture 7.PNG',
          title: 'User Management',
          description: 'System roles and permissions setup'
        },
        {
          url: 'assets/images/smart claim/Capture 8.PNG',
          title: 'Authentication',
          description: 'Secure login interface'
        },
        {
          url: 'assets/images/smart claim/Capture 9.PNG',
          title: 'Notifications',
          description: 'System alerts and updates'
        },
        {
          url: 'assets/images/smart claim/Capture 10.PNG',
          title: 'Document Preview',
          description: 'Integrated document viewer'
        },
        {
          url: 'assets/images/smart claim/Capture 11.PNG',
          title: 'Export Tools',
          description: 'Data export and extraction utilities'
        }
      ],
      currentIndex: 0
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    Object.values(this.showcases).forEach(showcase => {
      if (showcase.slideInterval) {
        clearInterval(showcase.slideInterval);
      }
    });
  }

  startAutoSlide() {
    Object.values(this.showcases).forEach(showcase => {
      if (showcase.images.length > 0) {
        showcase.slideInterval = setInterval(() => {
          this.nextSlide(showcase.id);
        }, 4000);
      }
    });
  }

  nextSlide(id: string) {
    const showcase = this.showcases[id];
    if (showcase && showcase.images.length > 0) {
      showcase.currentIndex = (showcase.currentIndex + 1) % showcase.images.length;
    }
  }

  prevSlide(id: string) {
    const showcase = this.showcases[id];
    if (showcase && showcase.images.length > 0) {
      showcase.currentIndex = (showcase.currentIndex - 1 + showcase.images.length) % showcase.images.length;
    }
  }

  setSlide(id: string, index: number) {
    const showcase = this.showcases[id];
    if (showcase) {
      showcase.currentIndex = index;
      if (showcase.slideInterval) {
        clearInterval(showcase.slideInterval);
      }
      if (showcase.images.length > 0) {
        showcase.slideInterval = setInterval(() => {
          this.nextSlide(id);
        }, 4000);
      }
    }
  }
}
