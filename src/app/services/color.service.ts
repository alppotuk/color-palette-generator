import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  forkJoin,
  of,
  tap,
} from 'rxjs';
import { IColor } from '../interfaces/IColor';
import { IPalette } from '../interfaces/IPalette';
import { I18nPluralPipe } from '@angular/common';
import { GetColorByHexRequest } from '../interfaces/GetColorByHexRequest.interface';
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'https://www.thecolorapi.com';

  private color: BehaviorSubject<IColor> = new BehaviorSubject<IColor>({
    name: '',
    hsl: { h: 0, s: 0, l: 0, value: '' },
    hex: { clean: '', value: '' },
    rgb: { r: 0, g: 0, b: 0, value: '' },
  });
  private palette: IPalette = {
    base_color_1: {
      name: 'Tan',
      hsl: { h: 20, s: 93, l: 72, value: 'hsl(20, 93%, 72%)' },
      hex: { value: '#FAA275', clean: 'FAA275' },
      rgb: { r: 250, g: 162, b: 117, value: 'rgb(250, 161, 117)' },
    },
    base_color_2: {
      name: 'EggPlant',
      hsl: { h: 326, s: 25, l: 29, value: 'hsl(326, 25%, 29%)' },
      hex: { value: '#5C374C', clean: '5C374C' },
      rgb: { r: 92, g: 55, b: 76, value: 'rgb(92, 55, 76)' },
    },
    colors: [],
  };

  constructor(private http: HttpClient) {
    this.initializePalette();
  }

  private initializePalette(): void {
    let req: GetColorByHexRequest = {
      hex: this.palette.base_color_1.hex.clean,
    };
    this.getColorByHex(req).subscribe((c: any) => {
      let color: IColor = {
        name: c.name.value,
        hsl: c.hsl,
        rgb: c.rgb,
        hex: c.hex,
      };
      this.palette.colors.push(color);
    });

    req = {
      hex: this.palette.base_color_2.hex.clean,
    };
    this.getColorByHex(req).subscribe((c: any) => {
      let color: IColor = {
        name: c.name.value,
        hsl: c.hsl,
        rgb: c.rgb,
        hex: c.hex,
      };
      this.palette.colors.push(color);
    });
  }

  getColorByHex(req: GetColorByHexRequest): Observable<IColor> {
    let colorHex = req.hex;
    if (colorHex[0] === '#') {
      colorHex = colorHex.slice(1);
    }
    const url = `${this.apiUrl}/id?hex=${colorHex}`;
    console.log(url);
    return this.http.get(url).pipe(
      tap((data: any) => {
        const color: IColor = {
          name: data.name.value,
          hex: data.hex,
          hsl: data.hsl,
          rgb: data.rgb,
        };
        this.color.next(color);
      }),
      catchError((error) => {
        console.error('An error occurred while fetching color data:', error);
        throw error;
      })
    );
  }

  // Expose the color and palette as observables
  getColor(): Observable<IColor> {
    return this.color.asObservable();
  }

  getPalette(): Observable<IPalette> {
    return of(this.palette);
  }

  updatePalette(numOfColors: number): Observable<IColor[]> {
    console.log('before-update:', this.palette);
    const h1 = this.palette.base_color_1.hsl.h;
    const s1 = this.palette.base_color_1.hsl.s;
    const l1 = this.palette.base_color_1.hsl.l;
    const h2 = this.palette.base_color_2.hsl.h;
    const s2 = this.palette.base_color_2.hsl.s;
    const l2 = this.palette.base_color_2.hsl.l;

    const steps = numOfColors - 1;
    console.log(steps);
    const h_step = (h2 - h1) / steps;
    const s_step = (s2 - s1) / steps;
    const l_step = (l2 - l1) / steps;

    console.log(h1, s1, l1, '-', h2, s2, l2);
    console.log('steps: h', h_step, 'l', l_step, 's', s_step);
    this.palette.colors = [];

    const observables = [];
    for (let i = 0; i < numOfColors - 1; i++) {
      let next_h = Math.floor(h1 + h_step * i);
      let next_s = Math.floor(s1 + s_step * i);
      let next_l = Math.floor(l1 + l_step * i);
      console.log('next hsl:', next_h, next_s, next_l);
      let url = `${this.apiUrl}/id?hsl=${next_h},${next_s}%,${next_l}%`;
      observables.push(this.http.get(url));
    }

    forkJoin(observables).subscribe((responses) => {
      responses.forEach((data: any) => {
        const color: IColor = {
          name: data.name.value,
          hex: data.hex,
          hsl: data.hsl,
          rgb: data.rgb,
        };
        this.palette.colors.push(color);
      });
      this.palette.colors.push(this.palette.base_color_2);
    });

    console.log('after-update:', this.palette);
    return of(this.palette.colors);
  }
}
