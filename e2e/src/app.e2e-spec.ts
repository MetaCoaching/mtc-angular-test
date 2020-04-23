import { browser, logging } from 'protractor';

import { AppPage } from './app.po';
import { ListPage } from './listUser.po';
import { RegisterPage } from './registerUser.po';

describe('App', () => {
  let page: AppPage;
  let registerPage: RegisterPage;
  let listPage: ListPage;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    birthDate: new Date(),
    email: 'johndoenonsense@dispostable.com',
    phone: '5555555555',
  };

  beforeEach(() => {
    page = new AppPage();
    listPage = new ListPage();
    registerPage = new RegisterPage();
  });

  it('should fill out registation form with a valid user', () => {
    // Go to the home page, then the register page
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Users');
    page.clickLink('Register');
    expect(registerPage.getSubHeaderText()).toEqual('Register');
    expect(registerPage.isRegisterEnabled()).toEqual(false);

    // Fill out the form
    const keys = Object.keys(user);
    keys.forEach(async (key) => {
      const value = key === 'birthDate' ? user[key].toDateString() : user[key];
      registerPage.fillInput(key, value);
    });

    // Registration button is enabled
    expect(registerPage.isRegisterEnabled()).toEqual(true);
  });

  it('should fill out registation form with an invalid user', () => {
    // Invalidate the phone number
    user.phone = 'nonsense';

    // Go to the home page, then the register page
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Users');
    page.clickLink('Register');
    expect(registerPage.getSubHeaderText()).toEqual('Register');
    expect(registerPage.isRegisterEnabled()).toEqual(false);

    // Fill out the form, including the invalid phone number
    const keys = Object.keys(user);
    keys.forEach(async (key) => {
      const value = key === 'birthDate' ? user[key].toDateString() : user[key];
      registerPage.fillInput(key, value);
    });

    // Registration button is not enabled
    expect(registerPage.isRegisterEnabled()).toEqual(false);
    expect(registerPage.isErrorDisplayed('phoneFormat')).toEqual(true);
  });

  it('should view the list', () => {
    // Go to the home page, then the register page
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Users');
    page.clickLink('List');
    expect(listPage.getSubHeaderText()).toEqual('List');
    expect(listPage.getNumberUsers()).toBeGreaterThanOrEqual(0);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
