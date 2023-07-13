import { createParticle } from './particle.js'
import { canvas, ctx } from './canvas.js'

export function getEdgeParticles(particle, range) {
  const edgeParticles = []

  const r = range

  const isOutOfLeftEdge = particle.x - r < 0
  const isOutOfRightEdge = particle.x + r > canvas.width
  const isOutOfTopEdge = particle.y - r < 0
  const isOutOfBottomEdge = particle.y + r > canvas.height

  if (isOutOfLeftEdge) {
    const edgeParticle = createParticle({
      x: canvas.width + particle.x,
      y: particle.y,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfRightEdge) {
    const edgeParticle = createParticle({
      x: particle.x - canvas.width,
      y: particle.y,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfTopEdge) {
    const edgeParticle = createParticle({
      x:  particle.x,
      y: canvas.height + particle.y,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfBottomEdge) {
    const edgeParticle = createParticle({
      x: particle.x,
      y: particle.y - canvas.height,
    })
    edgeParticles.push(edgeParticle)
  }

  return edgeParticles 
}
