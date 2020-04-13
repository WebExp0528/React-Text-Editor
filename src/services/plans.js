export const getPlanInfo = plan => {
  if (!plan) {
    return false;
  }

  return {
    price: plan.title.split('/')[0],
    period: plan.title.split('/')[1]
  }
};
