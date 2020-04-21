import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getHelloWorld(): Promise<string> {
    return element(by.css('div')).getText() as Promise<string>;
  }
}
