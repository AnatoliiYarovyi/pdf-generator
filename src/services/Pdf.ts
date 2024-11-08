import 'dotenv/config';
import puppeteer from 'puppeteer';

export class PdfService {
  async generatePdf(template: string) {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--lang=en-GB,en',
          '--disable-3d-apis',
          '--no-zygote',
        ],
        protocolTimeout: 120000,
        timeout: 120000,
      });

      const page = await browser.newPage();

      // Открываем строку с HTML-разметкой
      await page.setContent(template);

      // Создаем PDF-файл
      const pdfFile = await page.pdf();

      // Закрываем браузер
      await browser.close();

      return pdfFile;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
}
