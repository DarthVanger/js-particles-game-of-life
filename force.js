import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { getEdgeParticles } from './edges.js'
const universalPushForceRange = 80

export function applyForce() {
  applyFriction()
  const { particles } = state;
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      applyParticleForce(particles[i],particles[j])
    }
  }
}

function applyFriction() {
  const frictionConstant = 0.97
  const { particles } = state;
  for (const particle of particles) {
    particle.vx = particle.vx * frictionConstant
    particle.vy = particle.vy * frictionConstant
  }
}

function applyParticleForce(p1, p2) {
  applyAllParticleForces(p1, p2)
  applyParticleForceOnEdges(p1, p2)
}

function applyParticleForceOnEdges(p1, p2) {
  const edgeParticles = getEdgeParticles(p1, universalPushForceRange)
  for (const edgeParticle of edgeParticles) {
    applyAllParticleForces(edgeParticle, p2)
  }
}

function applyAllParticleForces(p1, p2) {
    universalPushForce(p1, p2)
}

function universalPushForce(p1, p2) {
  if (p1 === p2) return;
  const forceConstant = 10
  const distX = p2.x - p1.x
  const distY = p2.y - p1.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  if (dist > universalPushForceRange * 2) return;

  const forceX = (distX / dist) * forceConstant / dist
  const forceY = (distY / dist) * forceConstant / dist

  p2.vx += forceX
  p2.vy += forceY
}

export function renderForceCircles() {
  for (const particle of state.particles) {
    drawUniversalForceCircle(particle)
  }
}

function drawUniversalForceCircle(particle) {
  ctx.strokeStyle = 'blue'
  ctx.setLineDash([5, 10]);
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, universalPushForceRange, 0, Math.PI * 2, true)
  ctx.stroke()

  const edgeParticles = getEdgeParticles(particle, universalPushForceRange)
  for (const edgeParticle of edgeParticles) {
    ctx.strokeStyle = 'red'
    ctx.setLineDash([5, 0]);
    ctx.beginPath()
    ctx.arc(edgeParticle.x, edgeParticle.y, universalPushForceRange, 0, Math.PI * 2, true)
    ctx.stroke()
  }
}
