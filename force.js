import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
export const universalPushForceRange = 100

export function applyForce() {
  applyFriction()
  const { particles } = state;
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < particles.length; j++) {
      if (i !== j) {
        applyParticleForce(particles[i],particles[j])
      }
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
  applyForceToEdgeParticles(p1, p2)

  for (const edgeParticle of p1.edgeParticles) {
    applyAllParticleForces(edgeParticle, p2)
    applyForceToEdgeParticles(edgeParticle, p2)
  }
}

function applyForceToEdgeParticles(p1, p2) {
  for (const edgeParticle of p2.edgeParticles) {
    const force = universalPushForce(p1, edgeParticle)
    edgeParticle.forceX += force.x
    edgeParticle.forceY += force.y
    p2.forceX += force.x
    p2.forceY += force.y
  }
}

function applyAllParticleForces(p1, p2) {
    const force = universalPushForce(p1, p2)
    p2.forceX += force.x
    p2.forceY += force.y
}

function universalPushForce(p1, p2) {
  const zeroForce = { x: 0, y: 0 }
  const forceConstant = 1
  const distX = p2.x - p1.x
  const distY = p2.y - p1.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  if (dist > universalPushForceRange * 2) return zeroForce;

  const forceX = (distX / dist) * forceConstant / dist
  const forceY = (distY / dist) * forceConstant / dist

  return { x: forceX, y: forceY }
}

export function renderForceCircles() {
  for (const particle of state.particles) {
    drawUniversalForceCircle(particle)
  }
}

function drawUniversalForceCircle(particle) {
  ctx.save()

  ctx.strokeStyle = 'blue'
  ctx.setLineDash([5, 10]);
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, universalPushForceRange, 0, Math.PI * 2, true)
  ctx.stroke()

  for (const edgeParticle of particle.edgeParticles) {
    ctx.strokeStyle = 'red'
    ctx.setLineDash([5, 0]);
    ctx.beginPath()
    ctx.arc(edgeParticle.x, edgeParticle.y, universalPushForceRange, 0, Math.PI * 2, true)
    ctx.stroke()
  }

  ctx.restore()
}
