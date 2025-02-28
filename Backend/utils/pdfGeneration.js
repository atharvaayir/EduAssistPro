const puppeteer  = require('puppeteer');
const { renderEjs } = require('./renderEjs.js');

const genPdf = async (htmlContent,options = {}) =>{
    options.format = 'A4';
    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        // Set HTML content
        await page.setContent(htmlContent, { waitUntil: 'load' });

        // Generate PDF as buffer
        // const pdfBuffer = await page.pdf({ format: 'A4' });
        const pdfBuffer = await page.pdf(options);
        // Close browser
        await browser.close();

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
    }

};

const renderAndGenPdf = async (htmlFile,values) => {
    const html = await renderEjs(htmlFile,values);
    return await genPdf(html);
}

module.exports = { genPdf, renderAndGenPdf };