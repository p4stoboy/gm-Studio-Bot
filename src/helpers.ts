

export const choose = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const chance = (chance: number): boolean => {
  return Math.random() < chance;
}
