import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUrlEntity } from './entities/user_url.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserUrlService {
  constructor(
    @InjectRepository(UserUrlEntity)
    private readonly userUrlRepository: Repository<UserUrlEntity>,
  ) {}

  //finish---------
  async updateUserUrlView(url_id: number) {
    const findOneResult = await this.userUrlRepository.findOne({
      where: {
        id: url_id,
      },
    });

    if (!findOneResult) {
      throw new Error('존재하지 않는 url_id 입니다.');
    }

    const updateResult = await this.userUrlRepository.update(url_id, {
      view: findOneResult.view + 1,
    });

    if (!updateResult.affected) throw new Error('view 업데이트 실패');

    return true;
  }

  //finish---------
  async deleteUserUrl(url_id: number) {
    const updateResult = await this.userUrlRepository.update(url_id, {
      delete_at: new Date(Date.now()),
    });

    if (!updateResult.affected) throw new Error('url 삭제 실패');

    return true;
  }

  //finish---------
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
