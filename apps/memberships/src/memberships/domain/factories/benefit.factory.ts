import { Injectable } from '@nestjs/common';
import { Benefit } from '../value_objects/benefit';
import { randomUUID } from 'crypto';

@Injectable()
export class BenefitFactory {
  create(name: string, value: number): Benefit {
    const benefitId = randomUUID();
    const benefit = new Benefit(benefitId);
    benefit.name = name;
    benefit.value = value;

    return benefit;
  }
}
