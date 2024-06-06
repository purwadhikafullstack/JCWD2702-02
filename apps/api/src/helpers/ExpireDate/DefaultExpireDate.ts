export const currentTime = () => {
  const date = new Date();
  date.setHours(date.getHours() + 7);
  return date.toISOString();
};

export const defaultExpireTime = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + 7 + hours);
  return date.toISOString();
};
