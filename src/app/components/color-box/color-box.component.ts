import { Component, OnInit, Input } from '@angular/core';
import { IColor } from 'src/app/interfaces/IColor';

@Component({
  selector: 'app-color-box',
  templateUrl: './color-box.component.html',
  styleUrls: ['./color-box.component.scss'],
})
export class ColorBoxComponent implements OnInit {
  @Input()
  color!: IColor;

  showInfo = false;
  hoveredColorIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  showInfoBox(): void {
    this.showInfo = true;
  }

  hideInfoBox(): void {
    this.showInfo = false;
  }
}
