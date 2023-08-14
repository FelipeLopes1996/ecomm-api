import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Order from './Order';
import Product from '@modules/products/typeorm/entities/Product';

@Entity('orders_products')
class OrderProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products) // muitos para um
  @JoinColumn({ name: 'order_id' }) // junção de 1 cliente com várias orders
  order: Order;

  @ManyToOne(() => Product, product => product.order_products) // muitos para um
  @JoinColumn({ name: 'product_id' }) // junção de 1 cliente com várias orders
  product: Product;

  @Column()
  order_id: string;

  @Column()
  product_id: string;

  @Column('decimal')
  price: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderProducts;
