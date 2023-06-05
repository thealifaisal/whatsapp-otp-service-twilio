import * as twilio from 'twilio';
import { WhatsappMessageModel } from '../model/whatsapp.message.model';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpService {
  private readonly accountSid: string;
  private readonly authToken: string;
  private readonly sender: string;
  private readonly client: twilio.Twilio;

  public constructor(configService: ConfigService) {
    this.accountSid = configService.get('Twilio.Account_SID');
    this.authToken = configService.get('Twilio.Auth_Token');
    this.sender = configService.get('OTP_SENDER');
    this.client = twilio(this.accountSid, this.authToken);
  }

  public async send(otp: number, receiver: string): Promise<void> {
    const text = `Your OTP is ${otp}`;
    const whatsappMessage = new WhatsappMessageModel(
      text,
      receiver,
      this.sender,
    );
    const response = await this.client.messages.create(whatsappMessage);
    if (response.errorCode)
      throw new Error(`${response.errorCode}: ${response.errorMessage}`);
  }

  public generate(): number {
    const bytes = randomBytes(3);
    const randomNumber = parseInt(bytes.toString('hex'), 16);
    return randomNumber % 1_000_000;
  }
}
