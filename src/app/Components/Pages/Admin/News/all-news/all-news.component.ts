import { Component } from '@angular/core';
import { News } from '../../../../../Models/News/news';
import { NewsService } from '../../../../../Services/News/news.service';
import { Router, RouterModule } from '@angular/router';
import { NewsImageUpdate } from '../../../../../Models/News/news-image-update';
declare var bootstrap: any;

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './all-news.component.html',
  styleUrl: './all-news.component.scss'
})
export class AllNewsComponent {
allNews:News[] = [];
selectednewsId: string | null = null;

constructor(private newsService: NewsService,private router:Router) {}
  ngOnInit(): void {
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.allNews = news;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
  selectNews(newsId: string) {
    this.selectednewsId = newsId;
  }
  reloadComponent() {
    // Navigate away and back to the current route
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  deleteNews() {
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
                this.newsService.getAllNews().subscribe(newsItems => {
                  this.allNews = newsItems;
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

}
