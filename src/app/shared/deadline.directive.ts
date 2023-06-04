
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDeadline]'
})
export class DeadlineDirective implements OnInit {
  @Input() appDeadline: Date | string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    const now = new Date();
    const deadline = new Date(this.appDeadline);
    var timeDiff = deadline.getTime() - now.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


    if (diffDays < 0) {
      this.elementRef.nativeElement.classList.add('overdue-deadline');
    } else if (diffDays <= 3) {
      this.elementRef.nativeElement.classList.add('near-deadline');
    }
  }
}
