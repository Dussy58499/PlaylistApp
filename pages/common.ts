import { expect, Page } from "@playwright/test";

export abstract class CommonPage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  visitPage = async (url: any) => {
    await this.page.goto(url);
  };

  urlVerification = async (url: any) => {
    expect(this.page.url()).toBe(url);
  };
}
