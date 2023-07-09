import { canvas, ctx } from './canvas.js'

export function getEdgeParticles(particle) {
  const edgeParticles = []

  const r = particle.r

  const isOutOfLeftEdge = particle.x - r < 0
  const isOutOfRightEdge = particle.x + r > canvas.width
  const isOutOfTopEdge = particle.y - r < 0
  const isOutOfBottomEdge = particle.y + r > canvas.height

  if (isOutOfLeftEdge) {
    const edgeParticle = {
      x: canvas.width + particle.x,
      y: particle.y,
    }
    edgeParticles.push(particle)
  }

  if (isOutOfLeftEdge) {
    const edgeParticle = {
      x: canvas.width + particle.x,
      y: particle.y,
    }
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfRightEdge) {
    const edgeParticle = {
      x: particle.x - canvas.width,
      y: particle.y,
    }
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfTopEdge) {
    const edgeParticle = {
      x:  particle.x,
      y: canvas.height + particle.y,
    }
    edgeParticles.push(edgeParticle)
  }

  if (isOutOfBottomEdge) {
    const edgeParticle = {
      x: particle.x,
      y: particle.y - canvas.height,
    }
    edgeParticles.push(edgeParticle)
  }

  return edgeParticles 
}
