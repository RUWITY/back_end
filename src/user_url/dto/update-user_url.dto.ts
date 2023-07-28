import { PartialType } from '@nestjs/swagger';
import { CreateUserUrlDto } from './create-user_url.dto';

export class UpdateUserUrlDto extends PartialType(CreateUserUrlDto) {}
