import { test, expect } from "@playwright/test";
import { baseURL } from "../helper/Credentials";
import MainPage from "../pages/main.page";
import { convertToSeconds } from "../helper/utils";

let mainPage: MainPage;

test.beforeEach(async ({ page }) => {
  mainPage = new MainPage(page);
  await page.goto(baseURL);
  await mainPage.urlVerification(baseURL);
});

test.describe("Main page processes", () => {
  test("Verify page navigation", async () => {
    await mainPage.visitPage(baseURL);
    await mainPage.urlVerification(baseURL);
  });

  test("Verify Search Functionality:", async () => {
    await mainPage.fillSearchInput("Summer Breeze");
    await expect(mainPage.trackName()).toHaveCount(1);
    await expect(mainPage.trackName()).toHaveText("Summer Breeze");
    await expect(mainPage.trackName()).not.toHaveText("Autumn Leaves");
  });

  test("Verify Add Track Using + Button", async () => {
    await mainPage.fillSearchInput("Summer Breeze");
    await mainPage.clickAddButton();
    await expect(mainPage.playlistTrackName()).toHaveText("Summer Breeze");
    await expect(mainPage.playlistRemoveButton()).toBeVisible();
  });

  test("Verify Total Duration of the Playlist in Seconds", async () => {
    await mainPage.fillSearchInput("Summer Breeze");
    await mainPage.clickAddButton();
    await mainPage.playlistTrackDuration();
    const trackDuration = await mainPage.getPlaylistTrackDuration();
    const expectedDuration = await mainPage.getExpectedTrackDuration();

    const trackDurationInSeconds = convertToSeconds(trackDuration);
    expect(trackDurationInSeconds).toBe(expectedDuration);
  });
});
