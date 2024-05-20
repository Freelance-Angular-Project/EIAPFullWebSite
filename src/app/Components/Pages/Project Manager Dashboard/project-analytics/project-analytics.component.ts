import { Component } from '@angular/core';
import { ProgressData } from '../../../../Models/Projects/project-analytics';
import { ChartData, ChartOptions } from 'chart.js';
import { ProjectService } from '../../../../Services/Project/project.service';
import { NgChartsModule } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-analytics',
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  templateUrl: './project-analytics.component.html',
  styleUrl: './project-analytics.component.scss',
})
export class ProjectAnalyticsComponent {
  progressData: ProgressData = {} as ProgressData;
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
  };
  schoolChartData: { [key: string]: ChartData<'bar'> } = {};
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const chart = legend.chart;
          const meta = chart.getDatasetMeta(index);
          meta.hidden = !meta.hidden;
          chart.update();
        }
      }
    }
  };

  topSchoolChartData: { [key: string]: ChartData<'pie'> } = {};
  topSchoolsChartData!: ChartData<'pie'>;
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    }


  projectID: string = '';
  constructor(
    private projectAnalyticsService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectID = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log(this.projectID);

    this.getProjectAnalytics(); // Replace with actual project ID or use route params
  }

  getProjectAnalytics(): void {
    this.projectAnalyticsService
      .getProjectAnalytics(this.projectID)
      .subscribe((data) => {
        // console.log(data);

        this.progressData = data;
        this.setDoughnutChartData();
        this.setBarChartData();
        this.setTopSchoolsChartData();
      });
  }
  setDoughnutChartData(): void {
    const projectProgress = this.progressData.projectProgress;

    this.doughnutChartData = {
      labels: [
        'Total Tasks',
        'Completed Tasks',
        'Rejected Tasks',
        'Review Tasks',
        'Total Schools',
        'Total Schools Global',
        'Total Tasks Global',
        'Completed Tasks Global',
        'Rejected Tasks Global'
      ],
      datasets: [
        {
          data: [
            projectProgress.totalTasks ?? 0,
            projectProgress.completedTasks ?? 0,
            projectProgress.rejectedTasks ?? 0,
            projectProgress.reviewTasks ?? 0,
            projectProgress.totalSchools ?? 0,
            projectProgress.totalSchoolsGlobal ?? 0,
            projectProgress.totalTasksGlobal ?? 0,
            projectProgress.completedTasksGlobal ?? 0,
            projectProgress.rejectedTasksGlobal ?? 0
          ],
          backgroundColor: [
            '#117DE9',
            '#C811E9',
            '#11E3E9',
            '#EE6475',
            'purple',
            '#C1501B',
            '#4FAB0B',
            '#ADA926',
            '#E9B56D'
          ],
        }
      ]
    };
  }

  setBarChartData(): void {
    const schoolProgresses = this.progressData.schoolProgresses;

    for (const [schoolId, schoolData] of Object.entries(schoolProgresses)) {
      this.schoolChartData[schoolId] = {
        labels: ['School Tasks Progress'],
        datasets: [
          {
            label: 'Total Tasks',
            data: [schoolData.totalTasks ?? 0],
            backgroundColor: '#141A97',
          },
          {
            label: 'Completed Tasks',
            data: [schoolData.completedTasks ?? 0],
            backgroundColor: '#F75904',
          },
          {
            label: 'Rejected Tasks',
            data: [schoolData.rejectedTasks ?? 0],
            backgroundColor: '#9174EA',
          },
          {
            label: 'Review Tasks',
            data: [schoolData.reviewTasks ?? 0],
            backgroundColor: '#E5D50A',
          }
        ]
      };
    }
  }

  setTopSchoolsChartData(): void {
    const topSchools = this.progressData.projectProgress.topSchoolsGlobal;

    this.topSchoolsChartData = {
      labels: topSchools.map(school => school.schoolName),
      datasets: [
        {
          data: topSchools.map(school => school.completedTasks),
          backgroundColor:'#48C1D5',
        }
      ]
    };
  }

}
