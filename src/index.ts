import 'dotenv/config';

// services
import { PdfService } from './services/Pdf';

// controllers
import { PdfController } from './controllers/Pdf';

// others
import { App } from './app';

async function main() {
  try {
    // services
    const pdfService = new PdfService();

    // controllers
    const testController = new PdfController(pdfService);

    const port = Number(process.env.PORT) || 5000;
    const app = new App(port, [testController]);

    app.listen();
  } catch (error: any) {
    console.error(error);
  }
}

main();
