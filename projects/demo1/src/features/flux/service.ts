const url =
  'https://www.random.org/integers/?num=1&min=1&max=9&col=1&base=10&format=plain&rnd=new';

export const getRandom = (): Promise<number> => {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then((data) => {
      const num = parseInt(data.split('\n')[0]);
      console.log({ num });
      return num;
    });
};
