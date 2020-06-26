import randomWords from 'random-words';

export default function generateRandomString() {
  return randomWords({
    exactly: 1,
    minLength: 3,
  })[0];
}
