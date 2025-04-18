import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterLeadDto {
  @IsString()
  @IsNotEmpty({ message: 'Full Name is required' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsEmail({}, { message: 'Invalid MS Teams Id' })
  teamId: string;

  @IsString()
  @MinLength(10, { message: 'Mobile number must be at least 10 digits' })
  @MaxLength(15, { message: 'Mobile number must not exceed 15 digits' })
  @Matches(/^\+?[0-9]+$/, {
    message: 'Mobile number must contain only numbers and an optional leading +',
  })
  phoneNumber: string;

  @IsString()
  @MinLength(10, { message: 'Residence number must be at least 10 digits' })
  @MaxLength(15, { message: 'Residence number must not exceed 15 digits' })
  @Matches(/^\+?[0-9]+$/, {
    message: 'Residence number must contain only numbers and an optional leading +',
  })
  residenceNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Prefered Timing is required' })
  preferedTime: string;
  @IsString()
  @IsNotEmpty({ message: 'Purpose of Learning is required' })
  purpose: string;
}