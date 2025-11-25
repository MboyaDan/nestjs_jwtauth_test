import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ----------------------
  // SIGNUP
  // ----------------------
  async signup(dto: AuthDto) {
    // 1. Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ForbiddenException('Email already in use');
    }

    // 2. Hash password
    const hash = await argon2.hash(dto.password);

    // 3. Save user in DB
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },
    });

    // 4. Return JWT
    return this.signToken(user.id, user.email);
  }

  // ----------------------
  // SIGNIN
  // ----------------------
  async signin(dto: AuthDto) {
    // 1. Fetch user
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // 2. Compare passwords
    const pwMatches = await argon2.verify(user.hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // 3. Return JWT
    return this.signToken(user.id, user.email);
  }

  // ----------------------
  // SIGN JWT
  // ----------------------
  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
