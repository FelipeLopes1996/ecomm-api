import { EntityRepository, Repository, getRepository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/costumers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/costumers/domain/models/ICustomer';

@EntityRepository(Customer)
export default class CustomerRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;
  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { name },
    });
    return customer;
  }
  async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { id },
    });
    return customer;
  }
  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { email },
    });
    return customer;
  }
}
