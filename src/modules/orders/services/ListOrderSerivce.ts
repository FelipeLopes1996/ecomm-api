import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';
import Order from '../infra/typeorm/entities/Order';

class ListOrderSerivce {
  public async execute(): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const orders = await ordersRepository.find();
    return orders;
  }
}

export default ListOrderSerivce;
