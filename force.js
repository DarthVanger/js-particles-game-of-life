import { state } from './state.js'
import { canvas, ctx } from './canvas.js'

const universalPushForceRange = 20
const colorForceRange = 200

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
    const force = getForceBetweenParticles(p1, p2)
    p2.vx += force.x
    p2.vy += force.y
}

function getForceBetweenParticles(p1, p2) {
  const force = { x: 0, y: 0 }

  const forceMatrix = [
    [-1.5, -0.5, 0],
    [0, 0, 0],
    [0, 1, 0],
  ]

  const forceConstant = forceMatrix[p1.color][p2.color]

  let distX = p2.x - p1.x
  let distY = p2.y - p1.y

  // Apply forces through the edges of screen
  if (distX > canvas.width / 2) {
    distX = distX - canvas.width
  }
  if (distX < -canvas.width / 2) {
    distX = distX + canvas.width
  }
  if (distY > canvas.height / 2) {
    distY = distY - canvas.height
  }
  if (distY < -canvas.height / 2) {
    distY = distY + canvas.height
  }

  const dist = Math.sqrt(distX * distX + distY * distY)

  if (dist < universalPushForceRange) {
    force.x = (distX / dist) / dist
    force.y = (distY / dist) / dist
    return force
  }

  if (dist < colorForceRange) {
    force.x = (distX / dist) * forceConstant / dist
    force.y = (distY / dist) * forceConstant / dist
    return force
  }

  return force
}
