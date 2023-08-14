import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

// interface IPaginateCustomer {
//   from: number;
//   to: number;
//   per_page: number;
//   total: number;
//   current_page: number;
//   prev_page: number | null;
//   next_page: number | null;
//   data: Customer[];
// }

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customers = await customersRepository.find();
    // const customers = await customersRepository.createQueryBuilder().paginate();

    // return customers as IPaginateCustomer;
    return customers;
  }
}

export default ListCustomerService;
