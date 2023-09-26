import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { getEdgeParticles } from './edges.js'
const universalPushForceRange = 200

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

  const edgeParticles1 = getEdgeParticles(p1, universalPushForceRange)
  for (const edgeParticle of edgeParticles1) {
    applyAllParticleForces(edgeParticle, p2)
    applyForceToEdgeParticles(edgeParticle, p2)
  }
}

function applyForceToEdgeParticles(p1, p2) {
  const edgeParticles2 = getEdgeParticles(p2, universalPushForceRange)
  for (const edgeParticle of edgeParticles2) {
    const force = universalPushForce(p1, edgeParticle)
    p2.vx += force.x
    p2.vy += force.y
  }
}

function applyAllParticleForces(p1, p2) {
    const force = universalPushForce(p1, p2)
    p2.vx += force.x
    p2.vy += force.y
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
