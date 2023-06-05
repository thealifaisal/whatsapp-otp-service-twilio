export class WhatsappMessageModel {
  public readonly body: string;
  public readonly to: string;
  public readonly from: string;
  private readonly prefix: string = 'whatsapp:';

  public constructor(body: string, to: string, from: string) {
    this.body = body;
    this.to = `${this.prefix}${to}`;
    this.from = `${this.prefix}${from}`;
  }
}
