import { Component, OnInit } from '@angular/core';

export interface ProjectShowcase {
  id: string;
  title: string;
  date: string;
  company: string;
  description: string;
  images: { url: string; title: string; description: string; }[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  projects: ProjectShowcase[] = [
    {
      id: 'smart-construction',
      title: 'Smart Construction Suite',
      company: 'Kian Technologies - Plateforme Retina',
      date: 'July 2023 – February 2026',
      description: 'IoT integration and management dashboards. Developed and maintained CORE Platform features including rebranding, internationalization, generic widgets & dashboards, gateway management, anomalies detection, and billing & subscription management.',
      images: [
        { url: 'assets/images/smart-construction/smart construction.png', title: 'Smart Construction Suite', description: 'IoT integration and dashboards' }
      ]
    },
    {
      id: 'smart-claim',
      title: 'Smart Claim',
      company: 'ADDINN Tunisie',
      date: 'February 2021 – June 2023',
      description: 'Insurance claims management application. Part of a collaborative effort with designers, PO, and Scrum Master. Core responsibilities included integrating user interfaces with ADF (Alfresco) and Angular.',
      images: Array.from({ length: 22 }, (_, i) => ({
        url: `assets/images/smart claim/${i + 1}.png`,
        title: `Smart Claim - Screen ${i + 1}`,
        description: 'Insurance claims management interface'
      }))
    },
    {
      id: 'recouvrement',
      title: 'Digi Recouvrement (GED)',
      company: 'ADDINN Tunisie',
      date: 'February 2021 – June 2023',
      description: 'Banking debt recovery management application. Collaborated on requirements analysis and technical implementation to ensure a smooth, professional banking interface.',
      images: Array.from({ length: 18 }, (_, i) => ({
        url: `assets/images/recouvrement/${i + 1}.png`,
        title: `Recouvrement - Screen ${i + 1}`,
        description: 'Debt recovery management interface'
      }))
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
