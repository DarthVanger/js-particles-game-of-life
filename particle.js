import { state } from './state.js'
import { canvas, ctx } from './canvas.js'

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle({ index }) {
  const r = 10
  const particle = {
    id: index,
    x: index * r * 2,
    y: r + (index % 5) * r * 2,
    vx: 1,
    vy: 2,
    r,
  }

  return particle
}

export function createParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    state.particles.push(createParticle({
      index: i,
    }))
  }
}

export function updateParticle(particle) {
  particle.x += particle.vx
  particle.y += particle.vy

  teleportOnEdges(particle)
}

export function renderParticles() {
  for (const particle of state.particles) {
    updateParticle(particle)
    drawParticle(particle)
  }
}

function teleportOnEdges(particle) {
  const rightEdge = canvas.width - (particle.x + particle.r)
  if (rightEdge < 0) {
    particle.x = 0 + rightEdge
  }
  const leftEdge = (particle.x + particle.r)
  if (leftEdge < 0) {
    particle.x = canvas.width + leftEdge
  }
  const topEdge = (particle.y + particle.r)
  if (topEdge < 0) {
    particle.y = canvas.height - topEdge
  }
  const bottomEdge = canvas.height - (particle.y + particle.r)
  if (bottomEdge < 0) {
    particle.y = 0 - bottomEdge
  }
}
