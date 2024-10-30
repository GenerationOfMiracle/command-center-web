import { Component } from '@angular/core';
import { RouterModule, RouterLink} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterOutlet, NzLayoutModule, NzIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'command-centre';
}
