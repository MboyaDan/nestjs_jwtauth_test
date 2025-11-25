import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
    imports: [AuthModule],
    controllers: [BookmarkController],
    providers:[BookmarkService],
})
export class BookmarkModule {}
