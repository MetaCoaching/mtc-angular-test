import { browser, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class RegisterPage {
  navigateTo(): Promise<unknown> {
    return browser.get('/register') as Promise<unknown>;
  }

  fillInput(inputName: string, value: string) {
    return element(by.css(`input[formControlName="${inputName}"]`)).sendKeys(
      `${value}${protractor.Key.TAB}`
    );
  }

  getSubHeaderText() {
    return element(by.css('h2')).getText();
  }

  isErrorDisplayed(dataID: string) {
    return element(by.css(`mat-error[data-id="${dataID}"]`)).isDisplayed();
  }

  isRegisterEnabled() {
    return element(by.css('button[type="submit"]')).isEnabled();
  }
}
