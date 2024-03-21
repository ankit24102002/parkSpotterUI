import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  faStar = faStar;

  @Input() rating: number = 3;
  @Input() readonly: boolean = false;
  @Output() ratingSet: EventEmitter<number> = new EventEmitter<number>();

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
    this.ratingSet.emit(value); // Emit event with the new rating value
  }
}
//<app-star-rating [rating]="5"></app-star-rating>
