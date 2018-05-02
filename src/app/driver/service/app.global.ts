import {Injectable} from '@angular/core';

@Injectable()
export class AppGlobals {

  // server settings
  readonly baseAppUrl: string = 'https://tbuslog01.aws.bsu.edu:8443';
  readonly baseAPIUrl: string = 'https://tbuslog01.aws.bsu.edu:8443/shuttlelog';


  // local settings
  // readonly baseAppUrl: string = 'https://tbuslog01.aws.bsu.edu:8443';
  // readonly baseAPIUrl: string = 'http://localhost:8080/shuttlelog';
}
