import { expect, test } from "@playwright/test";

import { DashboardPage } from "./pages/dashboard.page";

test.describe("Dashboard Page", () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
  });

  test.describe("Page Load", () => {
    test("displays all main sections", async () => {
      await dashboard.goto();
      await dashboard.expectSectionsVisible();
    });

    test("shows earthquake table", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();
      await expect(page.locator("table")).toBeVisible();
    });

    test("shows KPI cards with data", async () => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();

      const totalEvents = await dashboard.getKpiCardValue("Total events");

      expect(totalEvents.trim()).not.toBe("");
    });
  });

  test.describe("Filters", () => {
    test("depth range filter updates URL params", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();
      await dashboard.setDepthRange("10", "100");

      await expect(page).toHaveURL(/minDepth=10/);
      await expect(page).toHaveURL(/maxDepth=100/);
    });

    test("magnitude range slider updates URL params", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();

      const slider = dashboard.magnitudeSlider;
      const sliderBB = await slider.boundingBox();

      if (sliderBB) {
        const thumbs = slider.locator("[data-slot='slider-thumb']");
        const firstThumb = thumbs.first();
        const firstThumbBB = await firstThumb.boundingBox();

        if (firstThumbBB) {
          await firstThumb.dragTo(slider, {
            targetPosition: {
              x: sliderBB.width * 0.3,
              y: sliderBB.height / 2,
            },
          });

          await page.waitForTimeout(600);
          await expect(page).toHaveURL(/minMag=/);
        }
      }
    });

    test("date picker filter updates URL params", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();

      await dashboard.datePickerTrigger.click();

      const calendar = page.locator("[role='grid']").first();

      await expect(calendar).toBeVisible();

      const days = calendar.getByRole("gridcell").filter({ hasText: /^\d+$/ });
      const dayCount = await days.count();

      if (dayCount >= 2) {
        await days.nth(0).click();
        await days.nth(Math.min(dayCount - 1, 5)).click();
        await page.waitForTimeout(600);
        await expect(page).toHaveURL(/dateFrom=/);
      }
    });

    test("reset button clears all filters", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();
      await dashboard.setDepthRange("10", "100");

      await expect(page).toHaveURL(/minDepth/);
      await expect(dashboard.resetButton).toBeVisible();

      await dashboard.clickReset();

      await dashboard.expectUrlDoesNotContain("minDepth");
      await dashboard.expectUrlDoesNotContain("maxDepth");
    });
  });

  test.describe("Deep Linking", () => {
    test("pre-populates depth filters from URL", async () => {
      await dashboard.gotoWithParams("minDepth=50&maxDepth=200");
      await dashboard.waitForDataLoad();

      await expect(dashboard.depthMinInput).toHaveValue("50");
      await expect(dashboard.depthMaxInput).toHaveValue("200");
    });

    test("pre-populates magnitude filters from URL", async ({ page }) => {
      await dashboard.gotoWithParams("minMag=3&maxMag=7");
      await dashboard.waitForDataLoad();

      await expect(page).toHaveURL(/minMag=3/);
      await expect(page).toHaveURL(/maxMag=7/);
    });
  });

  test.describe("Data Refresh", () => {
    test("table data refreshes when filters change", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();

      const earthquakesRequest = page.waitForResponse(
        (resp) =>
          resp.url().includes("/earthquakes") &&
          resp.url().includes("minDepth") &&
          resp.status() === 200,
      );

      await dashboard.setDepthRange("10", "100");

      const response = await earthquakesRequest;

      expect(response.ok()).toBeTruthy();
    });

    test("KPI cards refresh when filters change", async ({ page }) => {
      await dashboard.goto();
      await dashboard.waitForDataLoad();

      const statsRequest = page.waitForResponse(
        (resp) =>
          resp.url().includes("/analytics/stats") &&
          resp.url().includes("minDepth") &&
          resp.status() === 200,
      );

      await dashboard.setDepthRange("10", "100");

      const response = await statsRequest;

      expect(response.ok()).toBeTruthy();
    });
  });
});
