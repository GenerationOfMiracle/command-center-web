import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CardComponent } from '../card/card.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-accordian',
  standalone: true,
  imports: [CommonModule, NzCollapseModule, NzIconModule,CardComponent,NzProgressModule],
  templateUrl: './accordian.component.html',
  styleUrl: './accordian.component.css'
})
export class AccordianComponent {
  @Input() 
  data: any;
}

