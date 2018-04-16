import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppUrl: string = 'https://tbuslog01.aws.bsu.edu:8443';
  readonly baseAPIUrl: string = 'http://localhost:8080/shuttlelog';
}
