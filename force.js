import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { universalPushForceRange, colorForceRange } from './gameConstants.js'
import { getParticlesInRange } from './grid.js'

export function applyForce() {
  applyFriction()
  const { particles } = state;
  for (let i = 0; i < particles.length; i++) {
    const particlesInRange = getParticlesInRange(particles[i])

    for (let j = 0; j < particlesInRange.length; j++) {
      applyParticleForce(particles[i], particlesInRange[j])
      limitSpeed(particlesInRange[j])
    }
  }
}

function applyFriction() {
  const frictionConstant = 0.90
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
  if (dist === 0) {
    throw new Error('Trying to apply force between particles with distance = 0')
  }

  if (dist < universalPushForceRange) {
    const universalPushForceConstant = 1
    force.x = (distX / dist) * universalPushForceConstant / dist
    force.y = (distY / dist) * universalPushForceConstant / dist
    return force
  }

  if (dist < colorForceRange) {
    force.x = (distX / dist) * forceConstant / dist
    force.y = (distY / dist) * forceConstant / dist
    return force
  }

  return force
}

/**
 * Limit speed so that particles can't travel more than half screen in 1 fps.
 * Otherwise it causes issues with teleportation on edges and grid.
 */
function limitSpeed(particle) {
    if (particle.vx > canvas.width / 2) {
      particle.vx = canvas.width / 2
    }
    if (particle.vy > canvas.height / 2) {
      particle.vy = canvas.height / 2
    }
    if (particle.vx < -canvas.width / 2) {
      particle.vx = -canvas.width / 2
    }
    if (particle.vy < -canvas.height / 2) {
      particle.vy = -canvas.height / 2
    }
}
