import { canvas } from './canvas.js'
import { add } from './grid.js'
import { createParticle } from './particle.js'
import { state } from './state.js'

export function debugEdges() {
  createParticlesOnEdges()
}

export function createParticlesOnEdges() {
  const leftEdgeParticle = createParticle({
    id: 0,
    x: 5,
    y: canvas.height / 2,
    color: 0,
  })

  state.particles.push(leftEdgeParticle)
  add(leftEdgeParticle)

  const rightEdgeParticle = createParticle({
    id: 1,
    x: canvas.width - 20,
    y: canvas.height / 2,
    color: 0,
  })

  state.particles.push(rightEdgeParticle)
  add(rightEdgeParticle)
}
