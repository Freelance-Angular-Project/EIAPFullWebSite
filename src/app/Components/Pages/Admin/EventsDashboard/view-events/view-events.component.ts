import { Component } from '@angular/core';
import { Events } from '../../../../../Models/Events/events';
import { EventsService } from '../../../../../Services/Events/events.service';
import { Router, RouterModule } from '@angular/router';
import { NewsImageUpdate } from '../../../../../Models/News/news-image-update';
import { NewsService } from '../../../../../Services/News/news.service';
declare var bootstrap: any;

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.scss'
})
export class ViewEventsComponent {
  events: Events[] = [];
  selectednewsId : string | null = null;
  constructor(private eventsservice: EventsService,private newsService: NewsService,private router:Router) {}
  ngOnInit(): void {
    this.eventsservice.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  selectNews(newsId: string) {
    this.selectednewsId = newsId;
  }

  fileTouched = false;
  fileInvalid = false;
  selectedFile!: NewsImageUpdate ;
  onFileSelected(event: any, id: string) {
    if (event.target.files.length > 0) {
        const file: File = event.target.files[0];
        this.fileTouched = true;
        this.fileInvalid = false;

        this.newsService.updateNewsImage(id, file).subscribe({
            next: () => {
                console.log("Updated News Image");
                // Optionally refresh the list or image
                this.eventsservice.getEvents().subscribe(newsItems => {
                  this.events = newsItems;
                });
            },
            error: (err) => {
                console.error("Error updating news image:", err);
            }
        });
    } else {
        this.fileInvalid = true; // No file selected
    }
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
reloadComponent() {
  // Navigate away and back to the current route
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
  });
}
deleteTicket() {
  if (this.selectednewsId) {
    this.newsService.deleteNews(this.selectednewsId).subscribe({
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
    console.log('No school selected for deletion');
  }
}
}
