export const api = {
  get: async url => {
    try {
      const response = await fetch(url);

      return await response.json();
    } catch (err) {
      console.log('http get method', err);

      throw Error(err);
    }
  },
  post: async url => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        // eslint-disable-next-line no-undef
        body,
      });

      return await response.json();
    } catch (err) {
      console.log('http method pos err', err);
      throw Error(err);
    }
  },
};
