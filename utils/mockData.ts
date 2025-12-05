import { Cat, Owner } from '../types';

const FIRST_NAMES = ['John', 'Paul', 'George', 'Ringo', 'Michael', 'Jim', 'Pam', 'Dwight', 'Angela', 'Kevin'];
const LAST_NAMES = ['Lennon', 'McCartney', 'Harrison', 'Starr', 'Scott', 'Halpert', 'Beesly', 'Schrute', 'Martin', 'Malone'];
const CAT_NAMES = ['Snowball', 'Blackly', 'Garfield', 'Tom', 'Simba', 'Nala', 'Mochi', 'Luna', 'Bella', 'Oliver'];

export const generateMockData = (count: number = 30000): Owner[] => {
  const owners: Owner[] = [];
  for (let i = 0; i < count; i++) {
    const numCats = Math.floor(Math.random() * 4); // 0 to 3 cats
    const cats: Cat[] = [];
    for (let j = 0; j < numCats; j++) {
      cats.push({
        id: `cat-${i}-${j}`,
        name: CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)],
        ageYears: Math.floor(Math.random() * 15),
        ageMonths: Math.floor(Math.random() * 12),
      });
    }

    owners.push({
      id: `owner-${i}`,
      firstName: FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
      lastName: LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)],
      cats,
    });
  }
  return owners;
};
