import { RequestHandler } from 'express';

import { Controller } from './Controller';

import { IErrorResponse, IOkResponse, errorResponse, okResponse } from '../api/baseResponses';
import { PdfService } from '../services/Pdf';

export class PdfController extends Controller {
  constructor(readonly pdfService: PdfService) {
    super('/pdf');

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', this.link({ route: this.test }));
    this.router.post('/generate', this.link({ route: this.generatePdf }));
  }

  private test: RequestHandler<{}, {}, {}, {}> = async (req, res) => {
    res.json('ok-test');
  };

  private generatePdf: RequestHandler<{}, IErrorResponse | Buffer, { template?: string }, {}> =
    async (req, res) => {
      const { template } = req.body;

      if (!template) {
        res.status(400).json(errorResponse(400, 'template required'));
        return;
      }

      const pdfFile = await this.pdfService.generatePdf(template);

      res.contentType('application/pdf');
      res.send(Buffer.from(pdfFile));
    };
}
