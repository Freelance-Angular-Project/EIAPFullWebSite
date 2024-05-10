import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderProjectService } from '../../../Services/Loading/loader-project.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  // isLoading = this.loadingService.loading$;

  constructor(public loaderService: LoaderProjectService) {}
}
