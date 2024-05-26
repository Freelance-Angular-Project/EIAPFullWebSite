import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appProgressBars]',
  standalone: true
})
export class ProgressBarsDirective {

  @Input() completedTasks: number = 0;
  @Input() totalTasks: number = 1;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    this.updateProgressBar();
  }

  private updateProgressBar() {
    const percentage = (this.completedTasks / this.totalTasks) * 100;
    this.renderer.setStyle(this.el.nativeElement, 'width', `${percentage}%`);
  }

}
