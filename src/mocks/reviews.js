const getRandomInt = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export default [
  {
    id: `1`,
    name: `Max`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `Ad quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    date: Date.now() - getRandomInt(100000, 5000000),
  }, {
    id: `1`,
    name: `Elena`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `A quiet cozy and picturesque that. The building is green and from 18th century.`,
    date: Date.now() - getRandomInt(900000, 90000000),
  }, {
    id: `1`,
    name: `Sergey`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `The building is green and from 18th century.`,
    date: Date.now() - getRandomInt(100000, 90000000),
  }, {
    id: `1`,
    name: `Ivan`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `A quiet cozy and picturesque that hides behind a a river.`,
    date: Date.now() - getRandomInt(900000, 50000000),
  }, {
    id: `2`,
    name: `Oksana`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `Amsterdam. The building is green and from 18th century.`,
    date: Date.now() - getRandomInt(90000, 50000000),
  }, {
    id: `3`,
    name: `Timofey`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `A quiet cozy and picturesque building is green and from 18th century.`,
    date: Date.now() - getRandomInt(1000, 50000),
  }, {
    id: `4`,
    name: `Irina`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `Green and from 18th century.`,
    date: Date.now() - getRandomInt(1000, 50000),
  }, {
    id: `4`,
    name: `Teodora`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `A building is green and from 18th century.`,
    date: Date.now() - getRandomInt(1000, 50000),
  }, {
    id: `4`,
    name: `Klementa`,
    rating: `${getRandomInt(1, 5)}`,
    avatar: `https://api.adorable.io/avatars/${getRandomInt(100, 500)}`,
    text: `A quiet cozy and is green and from 18th century.`,
    date: Date.now() - getRandomInt(1000, 50000),
  }
];
