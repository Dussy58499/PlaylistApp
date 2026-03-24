import { expect, Page } from "@playwright/test";
import { CommonPage } from "./common";

export default class MainPage extends CommonPage {
  constructor(page: Page) {
    super(page);
  }

  searchInput = () => this.page.getByRole("textbox", { name: "Search" });

  trackRow = () =>
    this.page.locator("#tracklist .MuiGrid-container", {
      hasText: "Summer Breeze",
    });

  trackName = () => this.trackRow().getByText("Summer Breeze");
  addButton = () => this.trackRow().getByRole("button", { name: "+" });

  tracksPlaylist = () =>
    this.page.locator("#playlist .MuiGrid-container", {
      hasText: "Summer Breeze",
    });

  playlistTrackName = () => this.tracksPlaylist().getByText("Summer Breeze");
  playlistRemoveButton = () => this.tracksPlaylist().getByRole("button", { name: "-" });
  playlistTrackDuration = () => this.tracksPlaylist().locator("p").nth(1);

  getPlaylistTrackDuration = async () => {
    return await this.playlistTrackDuration().innerText();
  };

  getExpectedTrackDuration = async () => {
    const text = await this.page.locator("#playlist-duration").innerText();
    return Number(text);
  };

  fillSearchInput = async (text: string) => {
    await this.searchInput().fill(text);
  };

  clickAddButton = async () => {
    await this.addButton().click();
  };
}
