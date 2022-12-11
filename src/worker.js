export default () => {
  /* eslint-disable-next-line no-restricted-globals */
  self.addEventListener("message", (e) => {
    if (!e) return;

    const randomIntFromInterval = (min, max) => {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const rndInt = randomIntFromInterval(10000000, 30000000);

    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1,
    };

    for (let i = 0; i < rndInt; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    postMessage(users.length);
  });
};
