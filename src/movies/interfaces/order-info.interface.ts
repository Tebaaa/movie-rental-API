export class IOrderInfo {
  name: string;
  quantity: number;
  total: number;
  email: string;
  action: 'bought' | 'rented';
  movies_info: string[];
}
