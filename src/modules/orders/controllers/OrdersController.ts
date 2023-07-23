import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';
import ListOrderSerivce from '../services/ListOrderSerivce';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrder = new ListOrderSerivce();

    const order = await listOrder.execute();

    return response.json(order);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const newOrder = await createOrder.execute({ customer_id, products });

    return response.json(newOrder);
  }
}
