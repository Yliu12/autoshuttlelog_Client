import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
  readonly baseAppUrl: string = 'http://tbuslog01.aws.bsu.edu:8443';
  readonly baseAPIUrl: string = 'http://10.196.36.163:8080/shuttlelog';
}
