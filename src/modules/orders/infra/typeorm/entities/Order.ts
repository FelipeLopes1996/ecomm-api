import Customer from '@modules/costumers/typeorm/entities/Customer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderProducts from './OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer) // muitos para um
  @JoinColumn({ name: 'customer_id' }) // junção de 1 cliente com várias orders
  customer: Customer;

  @OneToMany(() => OrderProducts, order_products => order_products.order, {
    cascade: true,
  })
  order_products: OrderProducts[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Order;
