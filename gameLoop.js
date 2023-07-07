import { renderParticles } from './particle.js'
import { canvas, ctx } from './canvas.js'
import { state } from './state.js'

export function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  renderParticles()
  requestAnimationFrame(gameLoop)
}
