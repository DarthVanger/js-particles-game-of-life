import { renderParticles } from './particle.js'
import { canvas, ctx } from './canvas.js'
import { state } from './state.js'
import { applyForce, renderForceCircles, universalPushForceRange } from './force.js'
import { getEdgeParticles } from './edges.js'

export function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const particle of state.particles) {
    particle.edgeParticles = getEdgeParticles(particle, universalPushForceRange)
  }
  applyForce()
  renderParticles()
  renderForceCircles()
  requestAnimationFrame(gameLoop)
}
