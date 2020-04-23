import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/') as Promise<unknown>;
  }

  getHeaderText() {
    return element(by.css('h1')).getText();
  }

  clickLink(text: string) {
    return element(by.linkText(text)).click();
  }
}
