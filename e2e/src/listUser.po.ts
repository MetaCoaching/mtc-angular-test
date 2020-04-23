import { browser, by, element } from 'protractor';

export class ListPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/list') as Promise<unknown>;
  }

  getSubHeaderText() {
    return element(by.css('h2')).getText();
  }

  getNumberUsers() {
    return element.all(by.css('mat-list-item')).count();
  }
}
