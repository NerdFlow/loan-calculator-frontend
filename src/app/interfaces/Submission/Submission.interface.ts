export interface Submission {
  id: number;
  name: string;
  selected_package: {
    loan_amount: string;
    payment_frequency: string;
    time: string;
    commission: string;
    origination_fee: string;
    factor: string;
    payment: string;
    buy_rate: string;
  };
}
