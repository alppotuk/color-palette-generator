import { Component, OnInit } from '@angular/core';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  colors: IColor[] = [];
  numOfColors: number = 2;
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.colorService.getPalette().subscribe((palette) => {
      this.colors = palette.colors;
    });
  }
  changeNumOfColors(input: number): void {
    if (input == 1) {
      this.numOfColors++;
    } else if (input == -1 && this.numOfColors > 2) {
      this.numOfColors--;
    }
  }
  updatePalette(): void {
    this.colorService.updatePalette(this.numOfColors).subscribe((c) => {
      this.colors = c;
    });
    console.log('this.colors:', this.colors);
  }
}
