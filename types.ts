export interface Cat {
  id: string;
  name: string;
  ageYears: number;
  ageMonths: number;
}

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  cats: Cat[];
}
