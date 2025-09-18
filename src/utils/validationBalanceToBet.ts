import * as yup from 'yup';

export const validationBalanceToBet = (amount: number, context: yup.TestContext<yup.AnyObject>) => {
  const balance = context.options.context?.balance ?? 0;
  return amount <= balance;
};
