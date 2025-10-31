import { SELECTORS, DATA } from '../constants/index.js'
import { expect } from '@playwright/test'
import { waitForResponse } from '../utils/utils.js'

export class InitialPage {
    constructor(page) {
        this.page = page
    }

    async fillTitle(title) {
        await this.page.locator(SELECTORS.FORM_TITLE).fill(title)
    }

    async fillDescription(description) {
        await this.page.locator(SELECTORS.FORM_DESCRIPTION).fill(description)
    }
    
    async selectClientType(clientType) {
        await this.page.locator(SELECTORS.FORM_CLIENT_TYPE).selectOption(clientType)
    }

    async clickCreateTicket() {
        await this.page.locator(SELECTORS.BTN_CREATE_TICKET).click()
    }

    async waitForTicketCreation(status = 201) {
        return await waitForResponse(this.page, '/api/tickets', status, 'POST')
        console.log(status)
    }

    async waitForListTickets(status) {
        return await waitForResponse(this.page, '/api/tickets', status, 'GET')
    }

    async waitForProcessedQueue() {
        return await waitForResponse(this.page, '/api/tickets/process', 200, 'POST')
    }

    async clickProcessQueue() {
        await this.page.locator(SELECTORS.BTN_PROCESS_QUEUE).click()
    }

    async createTicket(title, description, clientType, status) {
        await this.fillTitle(title)
        await this.fillDescription(description)
        await this.selectClientType(clientType)
        await this.clickCreateTicket()
        return await this.waitForTicketCreation(status)
    }

    async createTicketWithoutSuccess(title, description, clientType) {
        await this.fillTitle(title)
        await this.fillDescription(description)
        await this.selectClientType(clientType)
        await this.clickCreateTicket()
    }

    async processTickets(status) {
        await this.clickProcessQueue()
        await this.waitForProcessedQueue()
        await this.waitForListTickets(status)
    }

    async expectResetForm() {
        await expect(this.page.locator(SELECTORS.FORM_TITLE)).toHaveValue('')
        await expect(this.page.locator(SELECTORS.FORM_DESCRIPTION)).toHaveValue('')
        await expect(this.page.locator(SELECTORS.FORM_CLIENT_TYPE)).toHaveValue(DATA.CLIENT_TYPE.FREE)
    }

    async expectClassifiedTickets(ticketId, title, clientType) {
        const classifiedTicket = this.page.locator(SELECTORS.CLASSIFIED_TICKET(ticketId))

        await expect(classifiedTicket).toContainText(title)
        await expect(classifiedTicket).toContainText(clientType)
        await expect(classifiedTicket.locator(SELECTORS.URGENCY_BADGE.BADGE)).toBeVisible()
    }

    async expectCreatedTicket(ticketId, title, clientType) {
        const pendingTicket = this.page.locator(SELECTORS.PENDING_TICKET(ticketId))

        await this.expectResetForm()
        await expect(pendingTicket).toContainText(title)
        await expect(pendingTicket).toContainText(clientType)
    }

    async expectProcessedBadge(ticketId, expectedBadgeText, expectedBadgeClass) {
        const badgeLocator = this.page.locator(`${SELECTORS.CLASSIFIED_TICKET(ticketId)} ${SELECTORS.URGENCY_BADGE.BADGE}`)
        
        await expect(badgeLocator).toBeVisible()
        await expect(badgeLocator).toHaveText(expectedBadgeText)
        await expect(badgeLocator).toHaveClass(new RegExp(`\\b${expectedBadgeClass}\\b`))
    }
}