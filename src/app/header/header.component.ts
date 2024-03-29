import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  useLanguage(language: string): void {
    this.translate.use(language);
  };

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

}

