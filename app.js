import { drawParticle, createParticle, updateParticle } from './particle.js'
import { canvas, ctx } from './canvas.js'

const particle = createParticle()
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  updateParticle(particle)
  drawParticle(particle)
  requestAnimationFrame(gameLoop)
}

gameLoop()
