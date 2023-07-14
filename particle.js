import { state } from './state.js'
import { canvas, ctx } from './canvas.js'

const r = 10

export function drawParticle (particle, color = 'black') {
  ctx.save()

  ctx.beginPath()
  ctx.fillStyle = color
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()

  ctx.lineWidth = 5
  ctx.strokeStyle = color
  const forceMultiplier = 1000
  ctx.beginPath()
  ctx.moveTo(particle.x, particle.y)
  ctx.lineTo(particle.x + particle.forceX * forceMultiplier, particle.y + particle.forceY * forceMultiplier)
  ctx.stroke()

  ctx.restore()
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
    forceX: 0,
    forceY: 0,
    r,
  }

  return particle
}

export function createParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    state.particles.push(createParticle({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }))
  }
}

export function updateParticle(particle) {
  particle.vx += particle.forceX
  particle.vy += particle.forceY
  particle.x += particle.vx
  particle.y += particle.vy

  teleportOnEdges(particle)
}

export function renderParticles() {
  for (const particle of state.particles) {
    updateParticle(particle)
    drawParticle(particle)
    for (const edgeParticle of particle.edgeParticles) {
      edgeParticle.x += particle.vx
      edgeParticle.y += particle.vy
      drawParticle(edgeParticle, 'red')
    }
    particle.forceX = 0
    particle.forceY = 0
  }
}

function teleportOnEdges(particle) {
  const r = particle.r
  const leftEdge = particle.x + r
  if (leftEdge < 0) {
    particle.x = canvas.width - r + leftEdge
  }
  const rightEdge = canvas.width - particle.x + r
  if (rightEdge < 0) {
    particle.x = 0 + r + rightEdge
  }
  const topEdge = particle.y + r
  if (topEdge < 0) {
    particle.y = canvas.height - r + topEdge
  }
  const bottomEdge = canvas.height - particle.y + r
  if (bottomEdge < 0) {
    particle.y = 0 + r + bottomEdge
  }

}
