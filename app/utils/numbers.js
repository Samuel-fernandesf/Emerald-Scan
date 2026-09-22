export function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude && min !== max) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export function calculateStars(attempts, maxRange) {
  const maxOptimal = Math.ceil(Math.log2(maxRange)) + 1;

  if (attempts <= maxOptimal) {
    return 3; // Desempenho Perfeito
  } else if (attempts <= maxOptimal + 2) {
    return 2; // Desempenho Bom
  } else {
    return 1; // Desempenho Aceitável
  }
}