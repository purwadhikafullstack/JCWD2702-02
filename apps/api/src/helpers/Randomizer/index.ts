export const orderGenerator = () => {
  const characters = '123456789';

  let result: string = '';

  for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};
