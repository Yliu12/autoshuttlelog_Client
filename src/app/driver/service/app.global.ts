import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppUrl: string = 'http://10.196.36.163:8080';
  readonly baseAPIUrl: string = 'http://10.196.36.163:8080/shuttlelog';
}
