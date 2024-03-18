import { createParticle } from './particle.js'
import { canvas, ctx } from './canvas.js'

export function getEdgeParticles(particle, range) {
  const edgeParticles = []

  const r = range

  const isOutOfLeftEdge = particle.x - r < 0
  const isOutOfRightEdge = particle.x + r > canvas.width
  const isOutOfTopEdge = particle.y - r < 0
  const isOutOfBottomEdge = particle.y + r > canvas.height

  const teleportRight = canvas.width + particle.x
  const teleportLeft = particle.x - canvas.width
  const teleportTop = particle.y - canvas.height
  const teleportBottom = canvas.height + particle.y

  if (isOutOfLeftEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportRight,
      y: particle.y,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfRightEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportLeft,
      y: particle.y,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfTopEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: particle.x,
      y: teleportBottom,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfBottomEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: particle.x,
      y: teleportTop,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfLeftEdge && isOutOfTopEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportRight,
      y: teleportBottom,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfLeftEdge && isOutOfBottomEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportRight,
      y: teleportTop,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfRightEdge && isOutOfTopEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportLeft,
      y: teleportBottom,
    })
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfRightEdge && isOutOfBottomEdge) {
    const edgeParticle = createParticle({
      ...particle,
      x: teleportLeft,
      y: teleportTop,
    })
    edgeParticles.push(edgeParticle)
  }

  return edgeParticles 
}
