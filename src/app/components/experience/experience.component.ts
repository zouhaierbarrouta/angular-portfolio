import { Component, OnInit } from '@angular/core';

export interface ProjectShowcase {
  id: string;
  title: string;
  date: string;
  company: string;
  description: string;
  technologies: string[];
  images: { url: string; title: string; description: string; }[];
}

export const PROJECTS_DATA: ProjectShowcase[] = [
  {
    id: 'smart-construction',
    title: 'Smart Construction Suite',
    company: 'Kian Technologies - Plateforme Retina',
    date: 'July 2023 – February 2026',
    description: 'Comprehensive IoT solution for Site Monitoring, Asset, Equipment & Machine Tracking, Vehicle Management, Worker Safety Monitoring, Energy Management, Access Control Management, and violation detection.',
    technologies: ['Angular', 'IoT', 'Spring Boot', 'GraphQL', 'REST API', 'RxJS', 'E-Chart', 'Leaflets'],
    images: [
      { url: 'assets/images/smart-construction/1.png', title: 'Smart Construction Suite - Overview', description: 'IoT integration and dashboards' },
      { url: 'assets/images/smart-construction/2.jpg', title: 'Smart Construction Suite - Monitor', description: 'Real-time monitoring interface' },
      { url: 'assets/images/smart-construction/3.jpg', title: 'Smart Construction Suite - Analytics', description: 'Data analytics and reporting' }
    ]
  },
  {
    id: 'fleet-ops',
    title: 'Fleet Ops',
    company: 'Kian Technologies - Plateforme Retina',
    date: 'July 2023 – February 2026',
    description: 'Comprehensive fleet management system with delivery trips management, real-time tracking, and resource optimization modules.',
    technologies: ['Angular', 'Leaflets', 'Spring Boot', 'GraphQL', 'IoT', 'Real-time Tracking', 'E-Chart'],
    images: Array.from({ length: 12 }, (_, i) => ({
      url: `assets/images/fleet-ops/${i + 1}.png`,
      title: `Fleet Ops - Screen ${i + 1}`,
      description: 'Fleet management interface'
    }))
  },
  {
    id: 'smart-parking',
    title: 'Smart Parking',
    company: 'Kian Technologies - Plateforme Retina',
    date: 'July 2023 – February 2026',
    description: 'Intelligent parking management system using IoT sensors to track occupancy, manage reservations, and provide real-time parking availability.',
    technologies: ['Angular', 'IoT', 'Spring Boot', 'GraphQL', 'Sensors', 'E-Chart', 'Leaflets'],
    images: Array.from({ length: 8 }, (_, i) => ({
      url: `assets/images/smart-parking/${i + 1}.png`,
      title: `Smart Parking - Screen ${i + 1}`,
      description: 'Parking management interface'
    }))
  },
  {
    id: 'waste-management',
    title: 'Waste Management',
    company: 'Kian Technologies - Plateforme Retina',
    date: 'July 2023 – February 2026',
    description: 'IoT-based waste management solution for optimizing collection routes, monitoring bin levels, and improving urban waste disposal efficiency.',
    technologies: ['Angular', 'IoT', 'GraphQL', 'Route Optimization', 'E-Chart', 'Leaflets'],
    images: Array.from({ length: 5 }, (_, i) => ({
      url: `assets/images/waste-management/${i + 1}.png`,
      title: `Waste Management - Screen ${i + 1}`,
      description: 'Waste management interface'
    }))
  },
  {
    id: 'air-craft',
    title: 'Aircraft Solution',
    company: 'Kian Technologies - Plateforme Retina',
    date: 'July 2023 – February 2026',
    description: 'Specialized solution for aircraft management and tracking, integrating IoT data for maintenance and operational monitoring.',
    technologies: ['Angular', 'IoT', 'GraphQL', 'Maintenance Tracking', 'E-Chart', 'Leaflets'],
    images: [
      { url: 'assets/images/air-craft/1.jpg', title: 'Aircraft Solution', description: 'Aircraft tracking and maintenance interface' }
    ]
  },
  {
    id: 'smart-claim',
    title: 'Smart Claim',
    company: 'ADDINN Tunisie',
    date: 'February 2021 – June 2023',
    description: 'Insurance claims management application. Part of a collaborative effort with designers, PO, and Scrum Master. Core responsibilities included integrating user interfaces with ADF (Alfresco) and Angular.',
    technologies: ['Angular', 'ADF (Alfresco)', 'Java', 'Insurance Tech'],
    images: Array.from({ length: 22 }, (_, i) => ({
      url: `assets/images/smart claim/${i + 1}.png`,
      title: `Smart Claim - Screen ${i + 1}`,
      description: 'Insurance claims management interface'
    }))
  },
  {
    id: 'poc-reclamation',
    title: 'Poc Réclamation',
    company: 'ADDINN Tunisie',
    date: 'February 2021 – June 2023',
    description: 'POC for a banking complaints management system, designed to handle customer feedback and resolution workflows efficiently.',
    technologies: ['Angular', 'ASP.Net Core', 'Banking POC'],
    images: [
      { url: 'assets/images/poc-reclamation/1.png', title: 'Poc Réclamation', description: 'Banking complaints management interface' }
    ]
  },
  {
    id: 'recouvrement',
    title: 'Digi Recouvrement (GED)',
    company: 'ADDINN Tunisie',
    date: 'February 2021 – June 2023',
    description: 'Banking debt recovery management application. Collaborated on requirements analysis and technical implementation to ensure a smooth, professional banking interface.',
    technologies: ['Angular', 'Alfresco', 'GED', 'Banking'],
    images: Array.from({ length: 18 }, (_, i) => ({
      url: `assets/images/recouvrement/${i + 1}.png`,
      title: `Recouvrement - Screen ${i + 1}`,
      description: 'Debt recovery management interface'
    }))
  },
  {
    id: 'ftusa',
    title: 'FTUSA',
    company: 'ADDINN Tunisie',
    date: 'February 2021 – June 2023',
    description: 'Insurance request management platform for FTUSA, facilitating paperless workflows and automated processing of insurance claims.',
    technologies: ['Angular', 'ASP.Net Core', 'Insurance Platform'],
    images: [
      { url: 'assets/images/ftusa/1.png', title: 'FTUSA - Insurance Request', description: 'Insurance request management interface' }
    ]
  }
];

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  projects: ProjectShowcase[] = PROJECTS_DATA;

  constructor() { }

  ngOnInit(): void {
  }
}
