import { renderParticles } from './particle.js'
import { canvas, ctx } from './canvas.js'
import { state } from './state.js'
import { applyForce, renderForceCircles } from './force.js'

export function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  applyForce()
  renderParticles()
  renderForceCircles()
  requestAnimationFrame(gameLoop)
}
