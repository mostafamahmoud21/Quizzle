import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterInstructorDto } from './dto/instructor/register.dto';
import { comparePasswords, hashPassword } from 'src/utils/bcrypt';
import { LoginInstructorDto } from './dto/instructor/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaClient, private readonly jwtService: JwtService) { }

    async registerInstructorService(dto: RegisterInstructorDto) {
        const ExistInstructor = await this.prisma.instructor.findUnique({ where: { email: dto.email } })

        if (ExistInstructor) {
            throw new ConflictException('Instructor already exists');
        }

        const passwordHash = await hashPassword(dto.password);

        const Instructor = await this.prisma.instructor.create({
            data: {
                name: dto.name,
                email: dto.email,
                experience: dto.experience,
                password: passwordHash,
            }
        })
        return {
            message: `Welcome, ${Instructor.name}! You have successfully registered as an instructor.`,
            instructor: {
                id: Instructor.id,
                name: Instructor.name,
                email: Instructor.email,
                experience: Instructor.experience,
            },
        };
    }

    async loginInstructorService(dto: LoginInstructorDto) {
        const ExistInstructor = await this.prisma.instructor.findUnique({ where: { email: dto.email } })

        if (!ExistInstructor) {
            throw new NotFoundException('Instructor Not Found');
        }

        const passwordsMatch = await comparePasswords(dto.password, ExistInstructor.password)

        if (!passwordsMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = {
            id: ExistInstructor.id,
            name: ExistInstructor.name,
            email: ExistInstructor.email
        }
        const token = this.jwtService.sign(payload)

        return {
            message: 'Login successful',
            token,
        }
    }
}
