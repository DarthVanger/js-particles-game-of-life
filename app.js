import { drawParticle, createParticle } from './particle.js'
import { canvas, ctx } from './canvas.js'

const particle = createParticle()
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particle.x += particle.vx
  particle.y += particle.vy
  drawParticle(particle)
  requestAnimationFrame(gameLoop)
}

gameLoop()
