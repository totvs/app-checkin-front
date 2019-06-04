import { Component, EventEmitter, Input, Output} from '@angular/core';

enum COLORS {
  GREY = '#4a5c60',
  GREEN = '#00b28e',
  YELLOW = '#FFCA28',
  RED = '#c64840'
}

@Component({
  selector: 'rating',
  templateUrl: 'rating.component.html'
})
export class RatingComponent {
  @Input() rating: number ;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  lenghtRate = [1, 2, 3, 4, 5];

  constructor() {}

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }

    switch (this.rating) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY;
    }
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  rate(rate: number) {
    this.rating = rate;
    this.ratingChange.emit(this.rating);
  }

}
