import { createParticle } from './particle.js'
import { canvas, ctx } from './canvas.js'

export function getEdgeParticle(particle, range) {
  const r = range

  const isOutOfLeftEdge = particle.x - r < 0
  const isOutOfRightEdge = particle.x + r > canvas.width
  const isOutOfTopEdge = particle.y - r < 0
  const isOutOfBottomEdge = particle.y + r > canvas.height

  const edgeParticle = createParticle({
    x: particle.x,
    y: particle.y,
  })

  if (
    !isOutOfLeftEdge && !isOutOfRightEdge &&
    !isOutOfTopEdge && !isOutOfBottomEdge
  ) {
    return null
  }

  if (isOutOfLeftEdge) {
    edgeParticle.x = canvas.width + particle.x
  }

  if (isOutOfRightEdge) {
    edgeParticle.x = particle.x - canvas.width
  }

  if (isOutOfTopEdge) {
    edgeParticle.y = canvas.height + particle.y
  }

  if (isOutOfBottomEdge) {
    edgeParticle.y = particle.y - canvas.height
  }

  return edgeParticle
}
