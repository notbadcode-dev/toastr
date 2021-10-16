import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from 'src/environments/environment';
import { AppModule } from './app.module';
import { DomService } from './services/dom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mixxin-toastr';

  constructor(private _domService: DomService) {}

  ngOnInit(): void {
    this.autoDetectDarkMode();

  }

  autoDetectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this._domService.addClassToElementByClassName('theme', 'theme-dark');
    } else {
      this._domService.addClassToElementByClassName('theme', 'theme-info');
    }
  }

  addServiceWorker(): void {
    platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
      if ('serviceWorker' in navigator && environment.production) {
         navigator.serviceWorker.register('ngsw-worker.js');
      }
   }).catch(err => console.log(err));
  }
}
