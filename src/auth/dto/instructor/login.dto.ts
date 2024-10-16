import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class LoginInstructorDto {
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    @IsNotEmpty({ message: 'Email cannot be empty.' })
    email: string;


    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    @IsNotEmpty({ message: 'Password cannot be empty.' })
    password: string;
}
