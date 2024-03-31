import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../../Services/Loading/loading.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  constructor(private loadingService: LoadingService) {}
}
