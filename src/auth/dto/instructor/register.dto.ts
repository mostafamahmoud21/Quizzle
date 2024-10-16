import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
    IsOptional,
  } from 'class-validator';
  
  export class RegisterInstructorDto {
    @IsString({ message: 'Name must be a string.' })
    @MinLength(3, { message: 'Name must be at least 3 characters long.' })
    @MaxLength(30, { message: 'Name must be at most 30 characters long.' })
    @IsNotEmpty({ message: 'Name cannot be empty.' })
    name: string;
  
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email: string;
  
    @IsNumber({}, { message: 'Experience must be a number.' })
    @IsNotEmpty({ message: 'Experience cannot be empty.' })
    experience: number;
  
    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @IsNotEmpty({ message: 'Password cannot be empty.' })
    password: string;
  }
  