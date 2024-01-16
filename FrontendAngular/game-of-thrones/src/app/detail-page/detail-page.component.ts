import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IceAndFireService } from '../services/ice-and-fire.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit{

  bookId: string | undefined;
  bookTitle: string | undefined;
  book: any;
  bookCharacterDetails: any | undefined;


  constructor(
  private route: ActivatedRoute,
  private booksService: IceAndFireService
  ) {}

  ngOnInit() {
  // Get the title from the URL
      this.bookTitle = this.route.snapshot.paramMap.get('title') || undefined;

      // Get the ID from the router state
      this.bookId = history.state.url
      if(this.bookId) {
        console.log(this.bookId, 'aaaaa');
        this.booksService.getBooksCharacterDetails(this.bookId).subscribe(
          (details) => {
            this.bookCharacterDetails = details;

            console.log(this.bookCharacterDetails, 'aaaaaasssssssss');
          },
          error => {
            console.error('Error fetching details:', error);
          }
        );

      }
  }
}
