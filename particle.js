import { canvas, ctx } from './canvas.js'

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle() {
  const particle = {
    x: 0,
    y: canvas.height / 2,
    vx: 10,
    vy: 0,
    r: 50,
  }

  return particle
}

export function updateParticle(particle) {
  particle.x += particle.vx
  particle.y += particle.vy

  handleEdges(particle)
}

function handleEdges(particle) {
  const isRightEdge = particle.x + particle.r > canvas.width
  if (isRightEdge) {
    //createVirtualParticle(particle)
    particle.x = 0 - particle.r
  }
}
