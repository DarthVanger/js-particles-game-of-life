import { canvas, ctx } from './canvas.js'

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle() {
  const particle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: 50,
  }

  return particle
}
