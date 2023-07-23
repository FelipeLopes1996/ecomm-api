import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && customer.email !== email) {
      throw new AppError('there is already one user with this email');
    }

    customer.name = name;
    customer.email = name;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
