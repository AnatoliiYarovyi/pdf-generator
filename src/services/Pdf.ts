import 'dotenv/config';
import puppeteer from 'puppeteer';

export class PdfService {
  async generatePdf(template: string) {
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
    const pdfFile = await page.pdf({
      format: 'A4', // Формат сторінки
      printBackground: true, // Включає фон та кольори стилів
      preferCSSPageSize: true, // Враховує розміри сторінок, задані CSS
      margin: {
        top: '50px', // Відступ під верхній колонтитул
        bottom: '50px', // Відступ під нижній колонтитул
        left: '20px',
        right: '20px',
      },
    });

    // Закрываем браузер
    await browser.close();

    return pdfFile;
  }
}
