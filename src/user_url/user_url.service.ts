import { Injectable } from '@nestjs/common';
import { CreateUserUrlDto } from './dto/create-user_url.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUrlEntity } from './entities/user_url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserUrlService {
  constructor(
    @InjectRepository(UserUrlEntity)
    private readonly userUrlRepository: Repository<UserUrlEntity>,
  ) {}

  async saveUserUrl(id: number, dto: CreateUserUrlDto) {
    const saveResult = await this.userUrlRepository.save(
      new UserUrlEntity({
        img: dto.img,
        title: dto.title,
        url: dto.url,
        view: 0,
        user_id: id,
      }),
    );

    return saveResult;
  }

  async updateUserUrlView(url_id: number) {
    const findOneResult = await this.userUrlRepository.findOne({
      where: {
        id: url_id,
      },
    });

    if (!findOneResult) {
      throw new Error('존재하지 않는 url 아이디 입니다.');
    }

    return await this.userUrlRepository.update(url_id, {
      view: findOneResult.view + 1,
    });
  }

  async deleteUserUrl(url_id: number) {
    const updateResult = await this.userUrlRepository.update(url_id, {
      delete_at: new Date(Date.now()),
    });

    return updateResult;
  }

  async findAllUserUrl(id: number) {
    const findResult = await this.userUrlRepository.find({
      where: {
        user_id: id,
        delete_at: null,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return findResult;
  }
}
