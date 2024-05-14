import { Component, OnInit } from '@angular/core';
import { ProjectDashboard } from '../../../../../Models/Projects/project-dashboard';
import { Router } from '@angular/router';
import { ProjectService } from '../../../../../Services/Project/project.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TicketResponse } from '../../../../../Models/Tickets/ticket-response';
import { TicketsService } from '../../../../../Services/Tickets/tickets.service';
declare var bootstrap: any;

@Component({
  selector: 'app-tickets-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tickets-dashboard.component.html',
  styleUrl: './tickets-dashboard.component.scss',
})
export class TicketsDashboardComponent implements OnInit {
  projects: ProjectDashboard[] = [];
  SelectedProjectId: string = '';
  form!: FormGroup;
  tickets:TicketResponse[]=[];
  selectedTicketId: string | null = null;

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private ticketservice:TicketsService
  ) {
    this.form = this.fb.group({
      projectId: ['', Validators.required], // Initialize the form control
    });
  }
  ngOnInit(): void {
    this.loadProjects();
    this.onChangeProject();

  }
  selectProjectId(id: string) {
    this.SelectedProjectId = id;
  }
  loadProjects(): void {
    this.projectService.getAllProjectsToDashboard().subscribe({
      next: (allprojects) => {
        this.projects = allprojects;
        this.selectProjectId(this.SelectedProjectId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  loadProjectDetails(projectId: string): void {
    this.ticketservice
      .getTicketsByProject(projectId)
      .subscribe({
        next: (tickets) => {
          this.tickets = tickets;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onChangeProject(): void {
    this.form.get('projectId')?.valueChanges.subscribe((selectedProjectId) => {
      this.loadProjectDetails(selectedProjectId);
    });
  }
  goTicketDetails(id: string) {
    this.router.navigate(['/TicketDetails', id]);
  }
  AddResponse(responseId:string){
    this.router.navigate(['/addResponse', responseId]);

  }

  openConfirmModal(): void {
    const confirmModal = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal'),
      {
        keyboard: false,
      }
    );
    confirmModal.show();
  }
  selectTicket(ticketId: string) {
    this.selectedTicketId = ticketId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteTicket() {
    if (this.selectedTicketId) {
      this.ticketservice.deleteTicket(this.selectedTicketId).subscribe({
        next: (data) => {
          const confirmModal = bootstrap.Modal.getInstance(
            document.getElementById('confirmDeleteModal')
          );
          confirmModal.hide();
          this.reloadComponent();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('No Ticket selected for deletion');
    }
  }
}
