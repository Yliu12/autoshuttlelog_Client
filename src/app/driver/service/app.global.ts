import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppUrl: string = 'http://localhost:4200';
  readonly baseAPIUrl: string = 'http://localhost:8080/shuttlelog';
}
