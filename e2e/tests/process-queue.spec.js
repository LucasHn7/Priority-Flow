import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { InitialPage } from '../page-objects/InitialPage.js'
import { SELECTORS, DATA } from '../constants/index.js'

test.describe('Process Queue', () => {
    let initialPage;
    test.beforeEach(async ({ page }) => {
        initialPage = new InitialPage(page)
        await page.goto('/')
        await initialPage.waitForListTickets()
    })

    test('should process the pending tickets and send them to the classified queue', async ({ page }) => {
        const formData = faker.helpers.arrayElement(Object.values(DATA.FORM_DATA))
        const clientType = faker.helpers.arrayElement(Object.values(DATA.CLIENT_TYPE))
        const creationStatus = 201
        const listStatus = 200

        const responseTicketCreation = await initialPage.createTicket(formData.TITLE, formData.DESCRIPTION, clientType, creationStatus)
        const body = await responseTicketCreation.json()
        const ticketId = body.id

        await initialPage.processTickets(listStatus)

        await initialPage.expectClassifiedTickets(ticketId, formData.TITLE, clientType)
    })
})