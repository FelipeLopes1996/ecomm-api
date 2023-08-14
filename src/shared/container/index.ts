import { ICustomersRepository } from '@modules/costumers/domain/repositories/ICustomersRepository';
import CustomerRepository from '@modules/costumers/infra/typeorm/repositories/CustomersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  CustomerRepository,
);
