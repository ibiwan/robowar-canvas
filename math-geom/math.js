export const clamp = (x, min, max) => {
  return x <= min ? min : (x >= max ? max : x)
}

export const mod = (n, m) => (n % m + m) % m;
