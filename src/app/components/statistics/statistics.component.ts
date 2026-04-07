import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('trafficChart') trafficChartRef!: ElementRef<HTMLCanvasElement>;

  visitsData: any[] = [];
  topPages: any[] = [];
  analyticsEmail = 'barroua.zouhaier@gmail.com';
  private chartInstance: any = null;
  private dataReady = false;
  private viewReady = false;

  constructor(
    private analyticsService: AnalyticsService,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    this.analyticsService.getVisitsData().subscribe(data => {
      this.visitsData = data;
      this.dataReady = true;
      if (this.viewReady) {
        this.initChart();
      }
    });

    this.analyticsService.getTopPages().subscribe(data => {
      this.topPages = data;
    });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.dataReady) {
      setTimeout(() => this.initChart(), 100);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.chartInstance) {
      this.chartInstance.resize();
    }
  }

  ngOnDestroy(): void {
    if (this.chartInstance) {
      this.chartInstance.dispose();
      this.chartInstance = null;
    }
  }

  initChart() {
    if (!this.trafficChartRef || !this.trafficChartRef.nativeElement) return;

    const isDark = this.themeService.getTheme() === 'dark';
    const canvas = this.trafficChartRef.nativeElement;

    // Dispose previous instance if exists
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }

    this.chartInstance = echarts.init(canvas);

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: isDark ? '#444' : '#fff',
        borderColor: '#bac964',
        borderWidth: 1,
        textStyle: {
          color: isDark ? '#fff' : '#333',
          fontFamily: 'Nunito Sans, sans-serif'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.visitsData.map(d =>
          new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })
        ),
        axisLine: { lineStyle: { color: isDark ? '#555' : '#ccc' } },
        axisTick: { show: false },
        axisLabel: {
          color: isDark ? '#aaa' : '#666',
          fontFamily: 'Nunito Sans, sans-serif',
          fontWeight: 'bold',
          fontSize: 11
        }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: isDark ? '#3a3a3a' : '#eee', type: 'dashed' } },
        axisLabel: {
          color: isDark ? '#aaa' : '#666',
          fontFamily: 'Nunito Sans, sans-serif',
          fontSize: 11
        }
      },
      series: [
        {
          data: this.visitsData.map(d => d.count),
          type: 'bar',
          barWidth: '45%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#bac964' },
              { offset: 1, color: '#8fa03e' }
            ]),
            borderRadius: [6, 6, 0, 0]
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#d4e577' },
                { offset: 1, color: '#bac964' }
              ])
            }
          }
        }
      ]
    };

    this.chartInstance.setOption(option);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
