import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout-admin',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './main-layout-admin.component.html',
  styleUrl: './main-layout-admin.component.scss'
})
export class MainLayoutAdminComponent {

}
