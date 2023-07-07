import { state } from './state.js'
import { canvas, ctx } from './canvas.js'

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle({ index }) {
  const r = 10
  const row = Math.floor(index / 30)
  const col = index % 30
  const particle = {
    id: index,
    x: 10 * r + col * r * 2,
    y: 10 * r + row * r * 2,
    vx: 0,
    vy: 0,
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
  const rightEdge = canvas.width - particle.x
  if (rightEdge < 0) {
    particle.x = 0 + rightEdge
  }
  const leftEdge = particle.x
  if (leftEdge < 0) {
    particle.x = canvas.width + leftEdge
  }
  const topEdge = particle.y
  if (topEdge < 0) {
    particle.y = canvas.height + topEdge
  }
  const bottomEdge = canvas.height - particle.y
  if (bottomEdge < 0) {
    particle.y = 0 - bottomEdge
  }
}
