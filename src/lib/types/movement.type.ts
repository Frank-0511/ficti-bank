export interface AccountMovement {
  id: string;
  date: string;
  type: string;
  amount: number;
  balance: number;
  description?: string;
  accountNumber: string;
}
