import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root div h1')).getText() as Promise<string>;
  }

  async getParagraphText(): Promise<string> {
    return element(
      by.css('app-root mat-toolbar span')
    ).getText() as Promise<string>;
  }
}
