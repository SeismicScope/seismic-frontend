import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly kpiSection: Locator;
  readonly filtersSection: Locator;
  readonly resetButton: Locator;
  readonly earthquakeTable: Locator;
  readonly datePickerTrigger: Locator;
  readonly depthMinInput: Locator;
  readonly depthMaxInput: Locator;
  readonly magnitudeSlider: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Dashboard", level: 1 });
    this.kpiSection = page.getByText("KPI Cards");
    this.filtersSection = page.getByText("Filters").first();
    this.resetButton = page.getByRole("button", { name: "Reset" });
    this.earthquakeTable = page.locator("table");
    this.datePickerTrigger = page.locator("#date-picker-range");
    this.depthMinInput = page
      .locator("[data-slot='card']")
      .filter({ hasText: "Depth Range" })
      .getByPlaceholder("Depth")
      .first();
    this.depthMaxInput = page
      .locator("[data-slot='card']")
      .filter({ hasText: "Depth Range" })
      .getByPlaceholder("Depth")
      .last();
    this.magnitudeSlider = page
      .locator("[data-slot='card']")
      .filter({ hasText: "Magnitude Range" })
      .locator("[data-slot='slider']");
  }

  async goto() {
    await this.page.goto("/dashboard");
    await this.heading.waitFor({ state: "visible" });
  }

  async gotoWithParams(params: string) {
    await this.page.goto(`/dashboard?${params}`);
    await this.heading.waitFor({ state: "visible" });
  }

  async waitForDataLoad() {
    await this.page.waitForLoadState("networkidle");
  }

  async getKpiCardValue(title: string): Promise<string> {
    const card = this.page
      .locator("[data-slot='card']")
      .filter({ hasText: title });

    return (
      (await card.locator("[data-slot='card-content']").textContent()) ?? ""
    );
  }

  async getTableRowCount(): Promise<number> {
    const rows = this.earthquakeTable.locator(
      "[data-slot='table-body'] [data-slot='table-row']",
    );

    return rows.count();
  }

  async setDepthRange(min: string, max: string) {
    await this.depthMinInput.fill(min);
    await this.depthMaxInput.fill(max);
    await this.page.waitForTimeout(600);
  }

  async clickReset() {
    await this.resetButton.click();
    await this.page.waitForTimeout(600);
  }

  async expectUrlContains(param: string, value?: string) {
    const url = this.page.url();

    expect(url).toContain(param);

    if (value) {
      expect(url).toContain(`${param}=${value}`);
    }
  }

  async expectUrlDoesNotContain(param: string) {
    const url = this.page.url();

    expect(url).not.toContain(param);
  }

  async expectSectionsVisible() {
    await expect(this.heading).toBeVisible();
    await expect(this.kpiSection).toBeVisible();
    await expect(this.filtersSection).toBeVisible();
  }
}
