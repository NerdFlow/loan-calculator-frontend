export interface Submission {
  id: number;
  name: string;
  driver_license: string;
  credit_card_processing_statement: string;
  proof_of_ownership: string;
  voided_check: string;
  selected_package: {
    customer_id: number;
    loan_amount: string;
    payment_frequency: string;
    time: string;
    commission: string;
    origination_fee: string;
    net_funding_amount: string;
    factor: string;
    payment: string;
    buy_rate: string;
  };
}
