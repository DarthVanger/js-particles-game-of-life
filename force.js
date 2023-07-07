import { state } from './state.js'

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
  const frictionConstant = 0.95
  const { particles } = state;
  for (const particle of particles) {
    particle.vx = particle.vx * frictionConstant
    particle.vy = particle.vy * frictionConstant
  }
}

function applyParticleForce(p1, p2) {
  universalPushForce(p1, p2)
}

function universalPushForce(p1, p2) {
  if (p1 === p2) return;
  const range = p1.r + 10
  const forceConstant = 1
  const distX = p2.x - p1.x
  const distY = p2.y - p1.y
  const dist = Math.sqrt(distX * distX + distY * distY)
  if (dist > range) return;

  const forceX = (distX / dist) * forceConstant
  const forceY = (distY / dist) * forceConstant

  p2.vx += forceX
  p2.vy += forceY
}
