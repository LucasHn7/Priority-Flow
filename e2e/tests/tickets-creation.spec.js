import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { InitialPage } from '../page-objects/InitialPage.js'
import { SELECTORS, DATA } from '../constants/index.js'

test.describe('Tickets Creation', () => {
    let initialPage;
    test.beforeEach(async ({ page }) => {
        initialPage = new InitialPage(page)
        await page.goto('/')
        await initialPage.waitForListTickets()
    })

    test('should create a ticket and and display it in the pending queue', async ({ page }) => {
        const formData = faker.helpers.arrayElement(Object.values(DATA.FORM_DATA))
        const clientType = faker.helpers.arrayElement(Object.values(DATA.CLIENT_TYPE))
        const creationStatus = 201

        const response = await initialPage.createTicket(formData.TITLE, formData.DESCRIPTION, clientType, creationStatus)
        const body = await response.json()
        const ticketId = body.id

        await initialPage.expectCreatedTicket(ticketId, formData.TITLE, clientType)
    })

    test('shouldnt create a ticket if the title is empty', async ({ page }) => {
        const formData = faker.helpers.arrayElement(Object.values(DATA.FORM_DATA))
        const clientType = faker.helpers.arrayElement(Object.values(DATA.CLIENT_TYPE))
        let requestWasMade = false;

        page.on('request', res => {
            if (res.url().includes('/api/tickets') && res.method() === 'POST') {
                requestWasMade = true;
            }
        });

        await initialPage.createTicketWithoutSuccess('', formData.DESCRIPTION, clientType)

        expect(requestWasMade).toBe(false)
    })

    test('shouldnt create a ticket if the description is empty', async ({ page }) => {
        const formData = faker.helpers.arrayElement(Object.values(DATA.FORM_DATA))
        const clientType = faker.helpers.arrayElement(Object.values(DATA.CLIENT_TYPE))

        let requestWasMade = false;

        page.on('request', res => {
            if (res.url().includes('/api/tickets') && res.method() === 'POST') {
                requestWasMade = true;
            }
        });

        await initialPage.createTicketWithoutSuccess(formData.TITLE, '', clientType)

        expect(requestWasMade).toBe(false)
    })

    test('shouldnt create a ticket if both fields are empty', async ({ page }) => {
        const clientType = faker.helpers.arrayElement(Object.values(DATA.CLIENT_TYPE))

        let requestWasMade = false;

        page.on('request', res => {
            if (res.url().includes('/api/tickets') && res.method() === 'POST') {
                requestWasMade = true;
            }
        });

        await initialPage.createTicketWithoutSuccess('', '', clientType)

        expect(requestWasMade).toBe(false)
    })
})