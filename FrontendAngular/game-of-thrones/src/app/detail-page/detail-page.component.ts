import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IceAndFireService } from '../services/ice-and-fire.service';
import { Store } from '@ngrx/store';
import { FavoriteBook } from '../store/models/FavoriteBook.model';

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
  public booksService: IceAndFireService,
  ) {}




  ngOnInit() {
      this.bookTitle = this.route.snapshot.paramMap.get('title') || undefined;

      this.bookId = history.state.url
      if(this.bookId) {
        this.booksService.getBooksCharacterDetails(this.bookId).subscribe(
          (details) => {
            this.bookCharacterDetails = details;
          },
          error => {
            console.error('Error fetching details:', error);
          }
        );

      }
  }

  onManageFavorites(event: Event, book: any) {
    event.stopPropagation();
    const favoriteBook: FavoriteBook = {
      id: book.url,
      name: book.name,
      author: book.authors.join(', ')
    }

    this.booksService.manageFavorites(favoriteBook);
  }

}
