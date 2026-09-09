import { test, expect } from '@playwright/test';

test('амжилттай нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page).toHaveURL(/inventory.html/);

    // Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
});

test('амжилтгүй нэвтрэх', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('buruu_nuuts_ug');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Epic sadface')).toBeVisible();
    await expect(page.getByText('Username and password do not match')).toBeVisible();
    // Нэвтэрч чадаагүй тул logout хэрэггүй
});

test('бараа сагслах', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Products')).toBeVisible();

    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // Logout
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
});