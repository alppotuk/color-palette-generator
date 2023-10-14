import { Component, Input, OnInit } from '@angular/core';
import { IColor } from 'src/app/interfaces/IColor';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.scss'],
})
export class ColorOptionsComponent implements OnInit {
  _color!: IColor;
  @Input() set color(value: IColor) {
    this._color = value;
    if (this._color && this._color.hex) {
      this.selectedColor = this._color.hex.value;
    }
  }
  @Input() position: boolean = true; // true -> left and false -> right

  selectedColor: string = '#f2ff00';
  touchUi: boolean = false;
  disabled: boolean = false;
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    setInterval(() => {
      // Update the variable every 5 seconds
      console.log(this.selectedColor);
    }, 5000);
  }
  updateBaseColor() {
    this.colorService.updateBaseColor(this.selectedColor, this.position);
  }
}
