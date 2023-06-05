import { OtpService } from '../service/otp.service';
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SendOtpDto } from '../dto/sendOtp.dto';

@Controller()
export class OtpController {
  private readonly otpService: OtpService;
  public constructor(otpService: OtpService) {
    this.otpService = otpService;
  }
  @Post()
  @HttpCode(201)
  public async sendOtp(@Body() body: SendOtpDto): Promise<string> {
    let response: string;
    try {
      const otp = this.otpService.generate();
      await this.otpService.send(otp, body.receiver);
      response = `Otp successfully sent to ${body.receiver}`;
      console.log(response);
      return response;
    } catch (error: any) {
      response = `Server Error: ${error.message}`;
      console.error(response);
      return response;
    }
  }
}
