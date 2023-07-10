import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { getEdgeParticles } from './edges.js'

const r = 10

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.fillStyle = 'black'
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function drawEdgeParticle (particle) {
  ctx.beginPath()
  ctx.fillStyle = 'red'
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle(props) {
  const particle = {
    id: props.id,
    x: props.x,
    y: props.y,
    vx: 0,
    vy: 0,
    r,
  }

  return particle
}

export function createParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const dist =  100
    const particlesInRow = Math.floor(canvas.width /  dist)
    const row = Math.floor(i / particlesInRow)
    const col = i % particlesInRow
    state.particles.push(createParticle({
      id: i,
      x: col * dist + 50,
      y: row * dist + 100,
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
    const edgeParticles = getEdgeParticles(particle, particle.r)
    for (const edgeParticle of edgeParticles) {
      drawEdgeParticle(edgeParticle)
    }
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
