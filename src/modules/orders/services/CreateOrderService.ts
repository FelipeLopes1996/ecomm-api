import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import CustomerRepository from '@modules/costumers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IOrderProducts {
  id: string;
  quantity: number;
}

interface IOrder {
  customer_id: string;
  products: IOrderProducts[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IOrder): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomerRepository); // dps mudar para CustomersRepository
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customers with the given id');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any produts with the given ids');
    }

    const existsProductsIds = existsProducts.map(({ id }) => id);

    const checkInexistentProducts = products.filter(
      ({ id }) => !existsProductsIds.includes(id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any produt ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvaiable = products.filter(
      product =>
        existsProducts.filter(p => product.id === p.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvaiable.length) {
      throw new AppError(
        `The quantity ${quantityAvaiable[0].quantity} is not available for ${quantityAvaiable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
