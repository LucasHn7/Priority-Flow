import { test, expect } from '@playwright/test'
import { InitialPage } from '../page-objects/InitialPage.js'
import { SELECTORS, DATA } from '../constants/index.js'

test.describe('Urgency calculation', () => {
    let initialPage;
    test.beforeEach(async ({ page }) => {
        initialPage = new InitialPage(page)
        await page.goto('/')
        await initialPage.waitForListTickets()
    })

    const testCases = [
        {   
            clientType: DATA.CLIENT_TYPE.PREMIUM,
            word: 'with the word "parado"',
            formData: DATA.FORM_DATA.PARADO,
            expectedBadgeText: DATA.URGENCY.CRITICAL,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.CRITICAL
        },
        {   
            clientType: DATA.CLIENT_TYPE.BASIC,
            word: 'with the word "parado"',
            formData: DATA.FORM_DATA.PARADO,
            expectedBadgeText: DATA.URGENCY.HIGH,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.HIGH
        },
        {   
            clientType: DATA.CLIENT_TYPE.FREE,
            word: 'with the word "lento"',
            formData: DATA.FORM_DATA.LENTO,
            expectedBadgeText: DATA.URGENCY.LOW,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.LOW
        },
        {   
            clientType: DATA.CLIENT_TYPE.PREMIUM,
            word: 'with the word "dúvida and "não funciona"',
            formData: DATA.FORM_DATA.DUVIDA_URGENTE,
            expectedBadgeText: DATA.URGENCY.CRITICAL,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.CRITICAL
        },
        {   
            clientType: DATA.CLIENT_TYPE.BASIC,
            word: 'without keyword',
            formData: DATA.FORM_DATA.DEFAULT,
            expectedBadgeText: DATA.URGENCY.LOW,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.LOW
        },
        {   
            clientType: DATA.CLIENT_TYPE.PREMIUM,
            word: 'with the word "AJUDA"',
            formData: DATA.FORM_DATA.AJUDA_INSENSITIVE,
            expectedBadgeText: DATA.URGENCY.MEDIUM,
            expectedBadgeClass: SELECTORS.URGENCY_BADGE.MEDIUM
        },
    ]

    testCases.forEach(testCase => {
        test(`should create a ticket ${testCase.clientType} ${testCase.word} and expect urgency ${testCase.expectedBadgeText}`, async ({ page }) => {
            const statusCreation = 201
            const listStatus = 200

            const responseTicketCreation = await initialPage.createTicket(testCase.formData.TITLE, testCase.formData.DESCRIPTION, testCase.clientType, statusCreation)
            const body = await responseTicketCreation.json()
            const ticketId = body.id

            await initialPage.processTickets(listStatus)

            await initialPage.expectProcessedBadge(ticketId, testCase.expectedBadgeText, testCase.expectedBadgeClass)
        })

    })
})