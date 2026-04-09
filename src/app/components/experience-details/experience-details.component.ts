import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS_DATA, ProjectShowcase } from '../experience/experience.component';

@Component({
  selector: 'app-experience-details',
  templateUrl: './experience-details.component.html',
  styleUrls: ['./experience-details.component.scss']
})
export class ExperienceDetailsComponent implements OnInit {
  project: ProjectShowcase | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.project = PROJECTS_DATA.find(p => p.id === id);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof (window as any).applyLanguage === 'function') {
        const lang = localStorage.getItem('language') || 'en';
        (window as any).applyLanguage(lang);
      }
    }, 100);
  }
}
