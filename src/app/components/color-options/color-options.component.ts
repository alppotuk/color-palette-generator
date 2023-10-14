import { Component, Input, OnInit } from '@angular/core';
import { IColor } from 'src/app/interfaces/IColor';

@Component({
  selector: 'app-color-options',
  templateUrl: './color-options.component.html',
  styleUrls: ['./color-options.component.scss'],
})
export class ColorOptionsComponent implements OnInit {
  @Input() color!: IColor;
  @Input() position: boolean = true; // true -> left and false -> right
  constructor() {}

  ngOnInit(): void {}
}
