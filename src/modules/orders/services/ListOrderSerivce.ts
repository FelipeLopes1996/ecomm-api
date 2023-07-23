import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from '../typeorm/entities/Order';

class ListOrderSerivce {
  public async execute(): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const orders = await ordersRepository.find();
    return orders;
  }
}

export default ListOrderSerivce;
