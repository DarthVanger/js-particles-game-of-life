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
    vx: 10,
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
}

export function renderParticles() {
  for (const particle of state.particles) {
    updateParticle(particle)
    drawParticle(particle)
  }
}
