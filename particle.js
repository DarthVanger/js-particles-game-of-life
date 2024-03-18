import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { getEdgeParticles } from './edges.js'

const r = 5

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.fillStyle = colorNumberToColorHex(particle.color)
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
    color: props.color,
    r,
  }

  return particle
}

export function createParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const dist = canvas.height / Math.sqrt(numParticles)
    const particlesInRow = Math.floor(canvas.width / dist)
    const row = Math.floor(i / particlesInRow)
    const col = i % particlesInRow
    state.particles.push(createParticle({
      id: i,
      //x: col * dist + dist,
      //y: row * dist + dist,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: i % 3,
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
      drawParticle(edgeParticle)
    }
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

function colorNumberToColorHex(color) {
  switch (color) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'blue'
  }
}
