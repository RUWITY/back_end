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
import { s3 } from 'src/config/config/s3.config';

@Injectable()
export class UserTapService {
  constructor(
    @InjectRepository(UserTapTextEntity)
    private readonly userTapTextRepository: Repository<UserTapTextEntity>,

    @InjectRepository(UserTapLinkEntity)
    private readonly userTapLinkRepository: Repository<UserTapLinkEntity>,
  ) {}

  //finish---------
  //text 생성
  async saveTapText(id: number) {
    const saveResult = await this.userTapTextRepository.save(
      new UserTapTextEntity({
        tap_type: 'text',
        context: '텍스트',
        user_id: id,
        folded_state: true,
      }),
    );

    return saveResult;
    // const savedEntities: UserTapTextEntity[] = [];

    // for (const item of dto) {
    //   const entity = new UserTapTextEntity({
    //     tap_type: 'text',
    //     title: item.title,
    //     context: item.context,
    //     user_id: id,
    //     folded_state: true,
    //   });

    //   const saveResult = await this.userTapTextRepository.save(entity);
    //   savedEntities.push(saveResult);
    // }

    // return savedEntities;
  }

  //finish---------
  //text 수정
  async updateTapText(dto: UpdateUserTapTextDto) {
    const updateResult = await this.userTapTextRepository.update(dto.tap_id, {
      context: dto.context,
    });

    if (!updateResult.affected) throw new Error('텍스트 내용 수정 실패');

    return true;
  }

  //finish---------
  //text 접은 상태 (펼침 true, 접힌 false)
  async updateTapFolderState(dto: UpdateUserTapFolderState) {
    const updateResuelt = await this.userTapTextRepository.update(dto.tap_id, {
      folded_state: dto.folded_state,
    });

    if (!updateResuelt.affected) throw new Error('폴더 상태 수정 실패');

    return true;
  }

  //finish---------
  //text 토글 변환 -> update_at도 수정
  async updateTapTextToggle(dto: UpdateUserTapToggle) {
    const updateResuelt = await this.userTapTextRepository.update(dto.tap_id, {
      toggle_state: dto.toggle_state,
      toggle_update_time: new Date(Date.now()),
    });

    if (!updateResuelt.affected) throw new Error('공개 설정 수정 실패');

    return true;
  }

  //finish---------
  //text 삭제
  async deleteTapText(tap_id: number) {
    const updateResult = await this.userTapTextRepository.update(tap_id, {
      delete_at: new Date(Date.now()),
    });

    if (!updateResult.affected) throw new Error('tap 삭제 실패');

    return true;
  }

  //finish---------
  //link 생성
  async saveTapLink(id: number) {
    // const savedEntities: UserTapLinkEntity[] = [];

    // for (const item of dto) {
    //   const entity = new UserTapLinkEntity({
    //     tap_type: 'link',
    //     img: item?.img || '',
    //     title: item?.title || '',
    //     url: item.url,
    //     user_id: id,
    //   });

    //   const saveResult = await this.userTapLinkRepository.save(entity);
    //   savedEntities.push(saveResult);
    // }

    // return savedEntities;

    const saveResult = await this.userTapLinkRepository.save(
      new UserTapLinkEntity({
        tap_type: 'link',
        img: '',
        title: '',
        url: '',
        user_id: id,
      }),
    );

    return saveResult;
  }

  //finish---------
  //link 수정
  async updateTapLink(dto: UpdateUserTapLinkDto) {
    const updateResult = await this.userTapLinkRepository.update(dto.tap_id, {
      title: dto?.title,
      url: dto?.url,
    });

    if (!updateResult.affected) throw new Error('텍스트 내용 수정 실패');

    return true;
  }

  //finish---------
  //link 접은 상태 (펼침 true, 접힌 false)
  async updateTapLinkFolderState(dto: UpdateUserTapFolderState) {
    const updateResuelt = await this.userTapLinkRepository.update(dto.tap_id, {
      folded_state: dto.folded_state,
    });

    if (!updateResuelt.affected) throw new Error('폴더 상태 수정 실패');

    return true;
  }

  //finish---------
  //link 토글 변환 -> update_at도 수정
  async updateTapLinkTextToggle(dto: UpdateUserTapToggle) {
    const updateResuelt = await this.userTapLinkRepository.update(dto.tap_id, {
      toggle_state: dto.toggle_state,
      toggle_update_time: new Date(Date.now()),
    });

    if (!updateResuelt.affected) throw new Error('공개 설정 수정 실패');

    return true;
  }

  //finish---------
  //link 삭제
  async deleteTapLink(id: number) {
    const updateResult = await this.userTapLinkRepository.update(id, {
      delete_at: new Date(Date.now()),
    });

    if (!updateResult.affected) throw new Error('tap 삭제 실패');

    return true;
  }

  //finish---------
  //모든 탭 출력 get -> delete_at null인것만 출력 조건 넣기 -> created_at 순으로 정렬
  async findAllByUserIdOrderByCreatedAtDesc(user_id: number): Promise<any[]> {
    const textResults = await this.userTapTextRepository.find({
      where: {
        user_id: user_id,
        delete_at: null,
        toggle_state: true,
      },
    });
    const linkResults = await this.userTapLinkRepository.find({
      where: {
        user_id: user_id,
        delete_at: null,
        toggle_state: true,
      },
    });

    for (let i = 0; i < linkResults.length; i++) {
      if (linkResults[i].img) {
        linkResults[i].img = await this.getPreSignedUrl(linkResults[i].img);
      }
    }

    const mergedResults = [...textResults, ...linkResults];
    mergedResults.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );

    return mergedResults;
  }

  //그냥 이미지 잘 나오나 확인 코드
  async getPreSignedUrl(key: string): Promise<string> {
    const imageParam = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 3600,
    };

    const preSignedUrl = await s3.getSignedUrlPromise('getObject', imageParam);

    return preSignedUrl;
  }
}
