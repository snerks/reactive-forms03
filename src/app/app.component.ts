import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
// import { featherAirplay } from '@ng-icons/feather-icons';
// import { heroUsers } from '@ng-icons/heroicons/outline';
import {
  bootstrapList,
  bootstrapPlusCircle,
  bootstrapPlusCircleFill,
  bootstrapHouseDoorFill,
  bootstrapPencilFill,
} from '@ng-icons/bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent, NgbModule],
  providers: [
    provideIcons({
      bootstrapList,
      bootstrapPlusCircle,
      bootstrapPlusCircleFill,
      bootstrapHouseDoorFill,
      bootstrapPencilFill,
    }),
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Recommended Shows';
}
