import { Crop } from '../../domain/crop';

export abstract class FindCropsRepository {
  abstract findAll(): Promise<Array<Crop>>;
  abstract findAllByState(isActive: boolean): Promise<Array<Crop> | undefined>;
  abstract findById(id: string): Promise<Crop | undefined>;
  abstract findByCompanyId(companyId: string): Promise<Array<Crop> | undefined>;
}
