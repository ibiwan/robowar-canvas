const vecAdd = ([a, b], [c, d]) => ([a + c, b + d])

const vecSub = ([a, b], [c, d]) => ([a - c, b - d])

const scaleVec = ([a, b], m) => ([a * m, b * m])

const dotProd = ([a, b], [c, d]) => a * c + b * d;

const rayHitsCircle = ([x1, y1], [xc, yc], r) => { }

const segHitsCircle = ([x1, y1], [x2, y2], [xc, yc], r) => {
  // const ton = 
}

const pt = (a, b) => ([a, b])
const vc = (a, b) => ([a, b])
const sg = (pta, ptb) => ([pta, ptb])
const dir = (sg) => {
  const [A, B] = sg
  return vecSub(B, A)
}

const segHitsPoint = (B, C, P) => {
  const M = dir(B, C)                         // memoize this
  const Mnorm = dotProd(M, M)                 // memoize this
  const dirP = dir([B, P])
  const t0 = dotProd(M, dirP) / Mnorm
  let nearPt = B
  if (t >= 1) { nearPt = vecAdd(B, M) }
  else if (t > 0) { nearPt = vecAdd(B, scaleVec(M, t0)) }
  // console.log({ B, C, P, M, Mnorm, dirP, t0, nearPt })
  // const dist = 


}

const distance to 