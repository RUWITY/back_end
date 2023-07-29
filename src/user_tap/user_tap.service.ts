import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTapLinkEntity } from './entities/user_tap_link.entity';
import { UserTapTextEntity } from './entities/user_tap_text.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateUserTapTextDto } from './dto/create-user-tap-text.dto';
import { UpdateUserTapTextDto } from './dto/update-user-tap-text.dto';
import { UpdateUserTapFolderState } from './dto/create-user-tap-folder.dto';
import { UpdateUserTapToggle } from './dto/create-user-tap-toggle.dto';
import { CreateUserTapLinkDto } from './dto/create-user-tap-link.dto';
import { UpdateUserTapLinkDto } from './dto/update-user-tap-link.dto';

@Injectable()
export class UserTapService {
  constructor(
    @InjectRepository(UserTapTextEntity)
    private readonly userTapTextRepository: Repository<UserTapTextEntity>,

    @InjectRepository(UserTapLinkEntity)
    private readonly userTapLinkRepository: Repository<UserTapLinkEntity>,
  ) {}

  //text 생성
  async saveTapText(id: number, dto: CreateUserTapTextDto) {
    const saveResult = await this.userTapTextRepository.save(
      new UserTapTextEntity({
        tap_type: dto.tap_type,
        context: dto.context,
        user_id: id,
        folded_state: true,
      }),
    );

    return saveResult;
  }

  //text 수정
  async updateTapText(dto: UpdateUserTapTextDto) {
    const updateResult = await this.userTapTextRepository.update(dto.tap_id, {
      context: dto.context,
    });

    return updateResult;
  }

  //text 접은 상태 (펼침 true, 접힌 false)
  async updateTapFolderState(dto: UpdateUserTapFolderState) {
    const updateResuelt = await this.userTapTextRepository.update(dto.tap_id, {
      folded_state: dto.folded_state,
    });

    return updateResuelt;
  }

  //text 토글 변환 -> update_at도 수정
  async updateTapTextToggle(dto: UpdateUserTapToggle) {
    const updateResuelt = await this.userTapTextRepository.update(dto.tap_id, {
      toggle_state: dto.toggle_state,
      toggle_update_time: new Date(Date.now()),
    });

    return updateResuelt;
  }

  //text 삭제
  async deleteTapText(id: number) {
    // const findResult = await this.userTapTextRepository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });

    // if (!findResult) {
    //   // 엔티티가 존재하지 않으면 예외 처리 또는 다른 로직 수행
    //   throw new NotFoundException('Entity not found');
    // }

    const updateResult = await this.userTapTextRepository.update(id, {
      delete_at: new Date(Date.now()),
    });

    return updateResult;
  }

  //link 생성
  async saveTapLink(id: number, dto: CreateUserTapLinkDto) {
    const saveResult = await this.userTapLinkRepository.save(
      new UserTapLinkEntity({
        tap_type: dto.tap_type,
        img: dto?.img || '',
        title: dto?.title || '',
        url: dto.url,
        user_id: id,
      }),
    );

    return saveResult;
  }

  //link 수정
  async updateTapLink(dto: UpdateUserTapLinkDto) {
    const updateResult = await this.userTapLinkRepository.update(dto.tap_id, {
      title: dto?.title,
      url: dto?.url,
    });

    return updateResult;
  }

  //link 접은 상태 (펼침 true, 접힌 false)
  async updateTapLinkFolderState(dto: UpdateUserTapFolderState) {
    const updateResuelt = await this.userTapLinkRepository.update(dto.tap_id, {
      folded_state: dto.folded_state,
    });

    return updateResuelt;
  }

  //link 토글 변환 -> update_at도 수정
  async updateTapLinkTextToggle(dto: UpdateUserTapToggle) {
    const updateResuelt = await this.userTapLinkRepository.update(dto.tap_id, {
      toggle_state: dto.toggle_state,
      toggle_update_time: new Date(Date.now()),
    });

    return updateResuelt;
  }

  //link 삭제
  async deleteTapLink(id: number) {
    const updateResult = await this.userTapLinkRepository.update(id, {
      delete_at: new Date(Date.now()),
    });

    return updateResult;
  }

  //모든 탭 출력 get -> delete_at null인것만 출력 조건 넣기 -> created_at 순으로 정렬
  async findAllByUserIdOrderByCreatedAtDesc(user_id: number): Promise<any[]> {
    const textResults = await this.userTapTextRepository.find({
      where: {
        user_id: user_id,
        delete_at: null,
      },
    });
    const linkResults = await this.userTapLinkRepository.find({
      where: {
        user_id: user_id,
        delete_at: null,
      },
    });

    const mergedResults = [...textResults, ...linkResults];
    mergedResults.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    return mergedResults;
  }
}
