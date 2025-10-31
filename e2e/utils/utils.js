export const waitForResponse = async (page, url, status = null, method = null) => {
    if(status != null && method != null){
        return await page.waitForResponse(
            res => res.url().includes(url)
            && res.status() === status
            && res.request().method() === method
        )
    }
    if(status != null){
        return await page.waitForResponse(
            res => res.url().includes(url)
            && res.status() === status
        )
    } else if(method != null){
        return await page.waitForResponse(
            res => res.url().includes(url)
            && res.request().method() === method
        )
    } else {
        return await page.waitForResponse(
            res => res.url().includes(url)
        )
    }
}
