import { SetMetadata } from '@nestjs/common';
import { LevelValue } from 'src/constants';

export const Levels = (...levels: LevelValue[]) =>
  SetMetadata('levels', levels);
