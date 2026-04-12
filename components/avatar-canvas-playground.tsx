"use client"

import { useRef, useCallback, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const DISPLAY_SIZE = 480

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

const HAIR_STYLES = ["mop", "twin_tails", "double_buns", "bob_bangs"] as const
export type HairStyle = (typeof HAIR_STYLES)[number]

export const HAIR_STYLE_LABELS: Record<HairStyle, string> = {
  mop: "蓬松乱翘",
  twin_tails: "双马尾",
  double_buns: "双丸子头",
  bob_bangs: "短发齐刘海",
}

export type AvatarParams = {
  seed: number
  bg: string
  faceCx: number
  faceCy: number
  faceRx: number
  faceRy: number
  skin: string
  eyeSep: number
  eyeRx: number
  eyeRy: number
  eyeRotL: number
  eyeRotR: number
  pupilR: number
  pupilOffLX: number
  pupilOffLY: number
  pupilOffRX: number
  pupilOffRY: number
  mouthW: number
  mouthDepth: number
  mouthY: number
  hairColor: string
  hairStrands: number
  hairStyle: HairStyle
  wobbleAmp: number
  lineBlack: string
}

function genParams(seed: number): AvatarParams {
  const rng = mulberry32(seed)
  const size = DISPLAY_SIZE
  const cx = size / 2

  const hue = clamp(55 + rng() * 115, 48, 175)
  const bg = `hsl(${hue} ${38 + rng() * 22}% ${86 + rng() * 10}%)`

  const faceScale = 0.36 + rng() * 0.07
  const faceRx = size * faceScale
  const faceRy = faceRx * (0.9 + rng() * 0.1)
  const faceCy = size * (0.46 + (rng() - 0.5) * 0.06)

  const skinHue = 22 + rng() * 28
  const skin = `hsl(${skinHue} ${65 + rng() * 18}% ${68 + rng() * 14}%)`

  // 先定眼宽，再保证两眼内侧间距 ≥ 阈值，避免「连眼」畸形
  const eyeRx = faceRx * (0.13 + rng() * 0.045)
  const eyeRy = eyeRx * (0.5 + rng() * 0.14)
  const minGap = faceRx * 0.1
  const eyeSep = eyeRx + minGap + rng() * faceRx * 0.1
  const eyeRotL = (rng() - 0.5) * 0.18
  const eyeRotR = (rng() - 0.5) * 0.18

  const pupilR = clamp(2.5 + rng() * 3.5, 2.5, 6)
  const j = 5
  const pupilOffLX = (rng() - 0.5) * j
  const pupilOffLY = (rng() - 0.5) * j * 0.65
  const pupilOffRX = (rng() - 0.5) * j
  const pupilOffRY = (rng() - 0.5) * j * 0.65

  const mouthW = faceRx * (0.48 + rng() * 0.16)
  const mouthDepth = 14 + rng() * 22
  const mouthY = faceCy + faceRy * (0.2 + rng() * 0.12)

  const hairColor = `hsl(${rng() * 40} 10% ${18 + rng() * 28}%)`
  const hairStrands = 48 + Math.floor(rng() * 28)
  const hairStyle = HAIR_STYLES[Math.floor(rng() * HAIR_STYLES.length)]
  const wobbleAmp = 2.2 + rng() * 3.4

  return {
    seed,
    bg,
    faceCx: cx,
    faceCy,
    faceRx,
    faceRy,
    skin,
    eyeSep,
    eyeRx,
    eyeRy,
    eyeRotL,
    eyeRotR,
    pupilR,
    pupilOffLX,
    pupilOffLY,
    pupilOffRX,
    pupilOffRY,
    mouthW,
    mouthDepth,
    mouthY,
    hairColor,
    hairStrands,
    hairStyle,
    wobbleAmp,
    lineBlack: "#141414",
  }
}

function strokeWobblyEllipse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rot: number,
  segments: number,
  rng: () => number,
  amp: number,
  strokeStyle: string,
  lineWidth: number,
  fillStyle?: string
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rot)
  ctx.beginPath()
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const w = (rng() - 0.5) * 2 * amp
    const x = Math.cos(t) * (rx + w)
    const y = Math.sin(t) * (ry + w * 0.55)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  if (fillStyle) {
    ctx.fillStyle = fillStyle
    ctx.fill()
  }
  ctx.strokeStyle = strokeStyle
  ctx.lineWidth = lineWidth
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.stroke()
  ctx.restore()
}

function fillEllipse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rot: number,
  fillStyle: string
) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rot)
  ctx.beginPath()
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2)
  ctx.fillStyle = fillStyle
  ctx.fill()
  ctx.restore()
}

/** 单线嘴：像随手划的——略歪、两端不齐、控制点乱飘、抖幅大，可叠一层淡线像蹭了一下 */
function strokeSimpleMouthLine(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  depth: number,
  rng: () => number,
  amp: number,
  strokeStyle: string,
  lineWidth: number
) {
  const halfNom = width / 2
  const halfL = halfNom * (0.88 + rng() * 0.2)
  const halfR = halfNom * (0.88 + rng() * 0.2)
  const slide = (rng() - 0.5) * width * 0.1
  const y0 = cy + (rng() - 0.5) * 10
  const y1 = cy + (rng() - 0.5) * 10
  const x0 = cx - halfL + slide
  const x1 = cx + halfR + slide
  const cxCtrl = cx + (rng() - 0.5) * width * 0.22
  const cyCtrl = cy + depth * (0.65 + rng() * 0.55)

  const segs = 7 + Math.floor(rng() * 8)
  const jit = amp * (1.15 + rng() * 1.1)

  const drawOnce = (lw: number, alpha: number, extraDrift: number) => {
    ctx.strokeStyle = strokeStyle
    ctx.globalAlpha = alpha
    ctx.lineWidth = lw
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
    ctx.beginPath()
    let lastX = x0
    let lastY = y0
    for (let i = 0; i <= segs; i++) {
      const t = i / segs
      const omt = 1 - t
      const bx =
        omt * omt * x0 + 2 * omt * t * cxCtrl + t * t * x1 + (rng() - 0.5) * extraDrift
      const by =
        omt * omt * y0 + 2 * omt * t * cyCtrl + t * t * y1
      const jx = bx + (rng() - 0.5) * jit
      const jy = by + (rng() - 0.5) * jit * 0.85
      lastX = jx
      lastY = jy
      if (i === 0) ctx.moveTo(jx, jy)
      else ctx.lineTo(jx, jy)
    }
    if (rng() > 0.5) {
      ctx.lineTo(
        lastX + (rng() - 0.5) * 14,
        lastY + 2 + rng() * 10
      )
    }
    ctx.stroke()
    ctx.globalAlpha = 1
  }

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate((rng() - 0.5) * 0.22)
  ctx.translate(-cx, -cy)

  drawOnce(lineWidth * (0.92 + rng() * 0.2), 1, 0)
  if (rng() > 0.35) {
    drawOnce(lineWidth * (0.35 + rng() * 0.35), 0.28 + rng() * 0.2, 2.5)
  }

  ctx.restore()
}

/**
 * 发束锚点只能在「脸的上半椭圆」：Canvas 中 y 向下，椭圆参数角 t 满足 sin(t)<0 时为头顶〜太阳穴。
 * 禁止在 t∈(0,π) 取点，否则会锚在下巴/腮，再往上画会像腋毛乱入。
 */
const HAIR_TOP_T0 = Math.PI * 1.06
const HAIR_TOP_T1 = Math.PI * 1.94

function isHairAnchorOk(faceCy: number, faceRy: number, by: number) {
  return by <= faceCy + faceRy * 0.04
}

/** 头顶厚发带：多层抖线弧叠出发量 */
function drawCrownMass(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  rng: () => number,
  layers: number
) {
  const { faceCx, faceCy, faceRx, faceRy, hairColor, wobbleAmp } = p
  ctx.strokeStyle = hairColor
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  const t0 = HAIR_TOP_T0
  const t1 = HAIR_TOP_T1
  const denom = Math.max(1, layers - 1)
  for (let L = 0; L < layers; L++) {
    const radMul = 0.78 + (L / denom) * 0.22
    const segs = 32 + Math.floor(rng() * 12)
    ctx.lineWidth = 2.2 + rng() * 2.4
    ctx.beginPath()
    for (let i = 0; i <= segs; i++) {
      const u = i / segs
      const t = t0 + u * (t1 - t0)
      const w = (rng() - 0.5) * wobbleAmp * 2.8
      const x =
        faceCx + Math.cos(t) * faceRx * radMul + w
      const y =
        faceCy + Math.sin(t) * faceRy * radMul * 0.9 + w * 0.45
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

function drawStrandFromArc(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  rng: () => number,
  topStart: number,
  topEnd: number,
  radMul: number,
  lenMin: number,
  lenMax: number,
  lw: number
) {
  const { faceCx, faceCy, faceRx, faceRy, hairColor, wobbleAmp } = p
  ctx.strokeStyle = hairColor
  ctx.lineWidth = lw
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  const lo = Math.min(topStart, topEnd)
  const hi = Math.max(topStart, topEnd)
  const clampedLo = Math.max(lo, HAIR_TOP_T0)
  const clampedHi = Math.min(hi, HAIR_TOP_T1)
  if (clampedLo >= clampedHi) return

  let bx = faceCx
  let by = faceCy - faceRy
  let t = Math.PI * 1.5
  for (let attempt = 0; attempt < 16; attempt++) {
    t = clampedLo + rng() * (clampedHi - clampedLo)
    bx = faceCx + Math.cos(t) * faceRx * radMul
    by = faceCy + Math.sin(t) * faceRy * radMul * 0.96
    if (isHairAnchorOk(faceCy, faceRy, by)) break
  }
  if (!isHairAnchorOk(faceCy, faceRy, by)) {
    t = Math.PI * 1.5
    bx = faceCx + Math.cos(t) * faceRx * radMul
    by = faceCy + Math.sin(t) * faceRy * radMul * 0.96
  }

  const len = lenMin + rng() * (lenMax - lenMin)
  const ang = -Math.PI / 2 + (rng() - 0.5) * 1.2
  ctx.beginPath()
  ctx.moveTo(bx, by)
  const segs = 3 + Math.floor(rng() * 4)
  for (let i = 1; i <= segs; i++) {
    const f = i / segs
    const nx =
      bx +
      Math.cos(ang) * len * f +
      (rng() - 0.5) * wobbleAmp * 2.4
    const ny =
      by +
      Math.sin(ang) * len * f * 0.88 +
      (rng() - 0.5) * wobbleAmp * 2.4
    ctx.lineTo(nx, ny)
  }
  ctx.stroke()
}

/** 从一点甩出的抖线（马尾 / 碎发） */
function drawJaggedStrand(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  rng: () => number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  lw: number
) {
  const { hairColor, wobbleAmp } = p
  ctx.strokeStyle = hairColor
  ctx.lineWidth = lw
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  const segs = 4 + Math.floor(rng() * 5)
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  for (let i = 1; i <= segs; i++) {
    const f = i / segs
    const x = x0 + (x1 - x0) * f + (rng() - 0.5) * wobbleAmp * 2.5
    const y = y0 + (y1 - y0) * f + (rng() - 0.5) * wobbleAmp * 2.5
    ctx.lineTo(x, y)
  }
  ctx.stroke()
}

function drawBun(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  rng: () => number,
  bx: number,
  by: number,
  br: number
) {
  const { hairColor, wobbleAmp } = p
  ctx.strokeStyle = hairColor
  ctx.lineCap = "round"
  for (let ring = 0; ring < 10; ring++) {
    const r = br * (0.35 + rng() * 0.65)
    ctx.lineWidth = 1.8 + rng() * 1.6
    ctx.beginPath()
    const n = 22
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * Math.PI * 2
      const w = (rng() - 0.5) * wobbleAmp * 1.2
      const x = bx + Math.cos(t) * (r + w)
      const y = by + Math.sin(t) * (r + w * 0.55)
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.stroke()
  }
  for (let i = 0; i < 28; i++) {
    const t = rng() * Math.PI * 2
    const r2 = br * (0.85 + rng() * 0.35)
    drawJaggedStrand(
      ctx,
      p,
      rng,
      bx,
      by,
      bx + Math.cos(t) * r2,
      by + Math.sin(t) * r2,
      1.4 + rng() * 1.2
    )
  }
}

function drawHairMop(ctx: CanvasRenderingContext2D, p: AvatarParams, rng: () => number) {
  drawCrownMass(ctx, p, rng, 18 + Math.floor(rng() * 8))
  const outerStart = HAIR_TOP_T0
  const outerEnd = HAIR_TOP_T1
  for (let s = 0; s < p.hairStrands + 25; s++) {
    drawStrandFromArc(ctx, p, rng, outerStart, outerEnd, 0.96, 28, 72, 1.8 + rng() * 1.8)
  }
  for (let s = 0; s < 28 + Math.floor(rng() * 14); s++) {
    drawStrandFromArc(ctx, p, rng, Math.PI * 1.15, Math.PI * 1.85, 0.84, 14, 42, 1.2 + rng() * 1.1)
  }
  for (let s = 0; s < 22; s++) {
    drawStrandFromArc(ctx, p, rng, Math.PI * 1.32, Math.PI * 1.68, 0.9, 18, 52, 1.5 + rng() * 1.3)
  }
}

function drawHairTwinTails(ctx: CanvasRenderingContext2D, p: AvatarParams, rng: () => number) {
  drawCrownMass(ctx, p, rng, 12 + Math.floor(rng() * 6))
  const { faceCx, faceCy, faceRx, faceRy } = p
  for (let s = 0; s < Math.floor(p.hairStrands * 0.55); s++) {
    drawStrandFromArc(
      ctx,
      p,
      rng,
      HAIR_TOP_T0,
      HAIR_TOP_T1,
      0.93,
      20,
      55,
      1.6 + rng() * 1.5
    )
  }
  const lx = faceCx - faceRx * 0.72
  const ly = faceCy - faceRy * 0.28
  const rx = faceCx + faceRx * 0.72
  const ry = faceCy - faceRy * 0.28
  for (let i = 0; i < 38; i++) {
    const ox = (rng() - 0.5) * faceRx * 0.12
    const oy = (rng() - 0.5) * faceRy * 0.1
    drawJaggedStrand(
      ctx,
      p,
      rng,
      lx + ox,
      ly + oy,
      lx - 22 - rng() * 35,
      ly + 95 + rng() * 110,
      1.6 + rng() * 1.4
    )
  }
  for (let i = 0; i < 38; i++) {
    const ox = (rng() - 0.5) * faceRx * 0.12
    const oy = (rng() - 0.5) * faceRy * 0.1
    drawJaggedStrand(
      ctx,
      p,
      rng,
      rx + ox,
      ry + oy,
      rx + 22 + rng() * 35,
      ry + 95 + rng() * 110,
      1.6 + rng() * 1.4
    )
  }
  for (let i = 0; i < 16; i++) {
    drawJaggedStrand(
      ctx,
      p,
      rng,
      lx - 8,
      ly + 40 + rng() * 50,
      lx - 5 - rng() * 20,
      ly + 130 + rng() * 40,
      1.2 + rng()
    )
    drawJaggedStrand(
      ctx,
      p,
      rng,
      rx + 8,
      ry + 40 + rng() * 50,
      rx + 5 + rng() * 20,
      ry + 130 + rng() * 40,
      1.2 + rng()
    )
  }
}

function drawHairDoubleBuns(ctx: CanvasRenderingContext2D, p: AvatarParams, rng: () => number) {
  drawCrownMass(ctx, p, rng, 10 + Math.floor(rng() * 5))
  const { faceCx, faceCy, faceRx, faceRy } = p
  for (let s = 0; s < Math.floor(p.hairStrands * 0.5); s++) {
    drawStrandFromArc(
      ctx,
      p,
      rng,
      HAIR_TOP_T0,
      HAIR_TOP_T1,
      0.9,
      18,
      48,
      1.5 + rng() * 1.4
    )
  }
  const bunY = faceCy - faceRy * 1.02
  const bunR = faceRx * 0.26
  drawBun(ctx, p, rng, faceCx - faceRx * 0.44, bunY, bunR * (0.9 + rng() * 0.15))
  drawBun(ctx, p, rng, faceCx + faceRx * 0.44, bunY, bunR * (0.9 + rng() * 0.15))
  for (let i = 0; i < 14; i++) {
    drawJaggedStrand(
      ctx,
      p,
      rng,
      faceCx - faceRx * 0.44,
      bunY,
      faceCx - faceRx * (0.35 + rng() * 0.2),
      bunY - 8 - rng() * 18,
      1.2 + rng()
    )
    drawJaggedStrand(
      ctx,
      p,
      rng,
      faceCx + faceRx * 0.44,
      bunY,
      faceCx + faceRx * (0.35 + rng() * 0.2),
      bunY - 8 - rng() * 18,
      1.2 + rng()
    )
  }
}

function drawHairBobBangs(ctx: CanvasRenderingContext2D, p: AvatarParams, rng: () => number) {
  drawCrownMass(ctx, p, rng, 14 + Math.floor(rng() * 6))
  const { faceCx, faceCy, faceRx, faceRy } = p
  for (let s = 0; s < p.hairStrands + 12; s++) {
    drawStrandFromArc(ctx, p, rng, HAIR_TOP_T0, HAIR_TOP_T1, 0.95, 22, 58, 1.7 + rng() * 1.6)
  }
  for (let s = 0; s < 36; s++) {
    drawStrandFromArc(ctx, p, rng, Math.PI * 1.28, Math.PI * 1.72, 0.88, 20, 55, 1.4 + rng() * 1.3)
  }
  /* 两侧挂发：仅用「上半脸」太阳穴角（左 1.10π～1.42π，右 1.58π～1.90π），禁止 0.5π～π 段（下半脸/下巴） */
  for (let s = 0; s < 20; s++) {
    drawStrandFromArc(
      ctx,
      p,
      rng,
      Math.PI * 1.1,
      Math.PI * 1.42,
      0.95,
      38,
      92,
      2 + rng() * 1.8
    )
  }
  for (let s = 0; s < 20; s++) {
    drawStrandFromArc(
      ctx,
      p,
      rng,
      Math.PI * 1.58,
      Math.PI * 1.9,
      0.95,
      38,
      92,
      2 + rng() * 1.8
    )
  }
  for (let s = 0; s < 26; s++) {
    const t =
      HAIR_TOP_T0 + rng() * (HAIR_TOP_T1 - HAIR_TOP_T0)
    const bx = faceCx + Math.cos(t) * faceRx * 0.91
    const by = faceCy + Math.sin(t) * faceRy * 0.88
    drawJaggedStrand(
      ctx,
      p,
      rng,
      bx,
      by,
      bx + (rng() - 0.5) * 12,
      by + 35 + rng() * 45,
      1.8 + rng() * 1.2
    )
  }
}

function drawHair(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  rng: () => number
) {
  switch (p.hairStyle) {
    case "mop":
      drawHairMop(ctx, p, rng)
      break
    case "twin_tails":
      drawHairTwinTails(ctx, p, rng)
      break
    case "double_buns":
      drawHairDoubleBuns(ctx, p, rng)
      break
    case "bob_bangs":
      drawHairBobBangs(ctx, p, rng)
      break
    default:
      drawHairMop(ctx, p, rng)
  }
}

function drawAvatar(
  ctx: CanvasRenderingContext2D,
  p: AvatarParams,
  pixelRatio: number
) {
  const w = DISPLAY_SIZE * pixelRatio
  const h = DISPLAY_SIZE * pixelRatio
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(pixelRatio, pixelRatio)

  const rng = mulberry32((p.seed ^ 0x9e3779b9) >>> 0)

  ctx.fillStyle = p.bg
  ctx.fillRect(0, 0, DISPLAY_SIZE, DISPLAY_SIZE)

  strokeWobblyEllipse(
    ctx,
    p.faceCx,
    p.faceCy,
    p.faceRx,
    p.faceRy,
    0,
    52,
    rng,
    p.wobbleAmp,
    p.lineBlack,
    3.2,
    p.skin
  )

  drawHair(ctx, p, rng)

  const eyeY = p.faceCy - p.faceRy * 0.08
  const lx = p.faceCx - p.eyeSep
  const rx = p.faceCx + p.eyeSep

  // 眼部用更小的抖幅，形状接近椭圆，避免锯齿连成一片
  const eyeWobble = p.wobbleAmp * 0.38
  strokeWobblyEllipse(
    ctx,
    lx,
    eyeY,
    p.eyeRx,
    p.eyeRy,
    p.eyeRotL,
    36,
    rng,
    eyeWobble,
    p.lineBlack,
    2.4,
    "#fefefe"
  )
  strokeWobblyEllipse(
    ctx,
    rx,
    eyeY,
    p.eyeRx,
    p.eyeRy,
    p.eyeRotR,
    36,
    rng,
    eyeWobble,
    p.lineBlack,
    2.4,
    "#fefefe"
  )

  fillEllipse(
    ctx,
    lx + p.pupilOffLX,
    eyeY + p.pupilOffLY,
    p.pupilR,
    p.pupilR * (0.85 + rng() * 0.2),
    p.eyeRotL * 0.3,
    p.lineBlack
  )
  fillEllipse(
    ctx,
    rx + p.pupilOffRX,
    eyeY + p.pupilOffRY,
    p.pupilR,
    p.pupilR * (0.85 + rng() * 0.2),
    p.eyeRotR * 0.3,
    p.lineBlack
  )

  const nx = p.faceCx
  const ny = p.faceCy + p.faceRy * 0.06
  ctx.fillStyle = p.lineBlack
  ctx.beginPath()
  ctx.arc(nx - 4, ny, 1.5, 0, Math.PI * 2)
  ctx.arc(nx + 4, ny, 1.5, 0, Math.PI * 2)
  ctx.fill()

  strokeSimpleMouthLine(
    ctx,
    p.faceCx,
    p.mouthY,
    p.mouthW,
    p.mouthDepth,
    rng,
    p.wobbleAmp * 0.85,
    p.lineBlack,
    2.4 + rng() * 0.9
  )
}

function randomSeed() {
  return (Math.random() * 0xffffffff) >>> 0
}

export default function AvatarCanvasPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useState<AvatarParams>(() => genParams(randomSeed()))

  const redraw = useCallback((p: AvatarParams) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1)
    canvas.width = DISPLAY_SIZE * dpr
    canvas.height = DISPLAY_SIZE * dpr
    canvas.style.width = `${DISPLAY_SIZE}px`
    canvas.style.height = `${DISPLAY_SIZE}px`
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawAvatar(ctx, p, dpr)
  }, [])

  useEffect(() => {
    redraw(params)
  }, [params, redraw])

  const handleRegen = () => {
    setParams(genParams(randomSeed()))
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = `呆萌头像-${params.seed}.png`
    a.click()
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
        <canvas
          ref={canvasRef}
          className="block rounded-xl"
          aria-label="呆萌头像画布"
        />
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3 sm:flex-row sm:max-w-none sm:justify-center">
        <Button type="button" className="rounded-full" onClick={handleRegen}>
          换一个
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleDownload}
        >
          下载保存
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        当前发型：<span className="font-medium text-foreground">{HAIR_STYLE_LABELS[params.hairStyle]}</span>
      </p>
      <p className="text-center text-xs text-muted-foreground max-w-md">
        发量由多层抖线弧叠成；嘴像随手划的歪线。发型含蓬松乱翘、双马尾、双丸子头、短发齐刘海等，每次「换一个」随机。
      </p>
    </div>
  )
}
