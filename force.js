import { state } from './state.js'
import { canvas, ctx } from './canvas.js'

const universalPushForceRange = 20
const colorForceRange = 100

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
}

function applyAllParticleForces(p1, p2) {
    const force = getForceBetweenParticles(p1, p2)
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

function colorForce(p1, p2) {
  const zeroForce = { x: 0, y: 0 }

  const forceMatrix = [
    [-1.5, -0.5, 0],
    [0, 0, 0],
    [0, 1, 0],
  ]

  const forceConstant = forceMatrix[p1.color][p2.color]

  const distX = p2.x - p1.x
  const distY = p2.y - p1.y

  const dist = Math.sqrt(distX * distX + distY * distY)

  if (dist > colorForceRange * 2 || dist < universalPushForceRange) return zeroForce;

  const forceX = (distX / dist) * forceConstant / dist
  const forceY = (distY / dist) * forceConstant / dist

  return { x: forceX, y: forceY }
}

function getForceBetweenParticles(p1, p2) {
  const universalPushForceValue = universalPushForce(p1, p2)
  const colorForceValue = colorForce(p1, p2)

  return {
    x: universalPushForceValue.x + colorForceValue.x,
    y: universalPushForceValue.y + colorForceValue.y
  }
}
