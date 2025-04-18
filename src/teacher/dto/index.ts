import {
    IsString,
    IsEmail,
    IsOptional,
    Matches,
    MinLength,
    MaxLength,
    IsArray,
    ArrayMinSize,
    IsEnum,
    IsDateString,
    IsNumber,
    IsJSON,
    IsObject,
  } from 'class-validator';
  
  export class AdminAddTeacherDto {
    @IsString()
    @MinLength(1, { message: 'Fullname is required' })
    fullname: string;
  
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
  
    @IsString()
    @MinLength(1, { message: 'Invalid teams Id address' })
    teamsId: string;
  
    @IsOptional()
    @Matches(/^\+?[0-9]*$/, {
      message: 'Phone number must contain only numbers and an optional leading +',
    })
    @MinLength(10, { message: 'Phone number must be at least 10 digits' })
    @MaxLength(15, { message: 'Phone number must not exceed 15 digits' })
    phone?: string;
  
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one course must be selected' })
    @IsNumber({}, { each: true })
    courses: string[];
  
    @IsEnum(['male', 'female', 'other'], {
      message: 'Gender is required',
    })
    gender: 'male' | 'female' | 'other';
  
    @IsDateString({}, { message: 'Invalid date format' })
    dob: string;
  
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    @Matches(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    })
    password: string;
  }
  

  export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    identity?: string;
  
    @IsOptional()
    @IsString()
    avatar?: string;
  
    @IsOptional()
    @IsString()
    fullname?: string;
  
    @IsOptional()
    @IsDateString()
    dob?: string;
  
    @IsOptional()
    @IsString()
    gender?: string;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @IsString()
    state?: string;
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    zip?: string;
  
    @IsOptional()
    @IsString()
    bio?: string;
  
    @IsOptional()
    @IsString()
    sign?: string;
  
    @IsOptional()
    @IsString()
    teamsId?: string;
  
    @IsOptional()
    @IsNumber()
    averageRating?: number;
  
    @IsOptional()
    @IsObject()
    availibility?: any;
  
    @IsOptional()
    @IsString()
    marital_status?: string;
  
    @IsOptional()
    @IsString()
    language?: string;
  
    @IsOptional()
    @IsString()
    education?: string;
  }