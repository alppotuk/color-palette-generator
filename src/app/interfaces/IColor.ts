export interface IColor {
  name: string;
  hex: HEX;
  hsl: HSL;
  rgb: RGB;
}

export interface HEX {
  clean: string;
  value: string;
}
export interface HSL {
  h: number;
  s: number;
  l: number;
  value: string;
  fraction?: any;
}
export interface RGB {
  r: number;
  g: number;
  b: number;
  value: string;
  fraction?: any;
}
