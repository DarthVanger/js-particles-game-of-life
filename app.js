const canvas = document.createElement('canvas')
canvas.width = 600
canvas.height = 600
const ctx = canvas.getContext('2d')

function drawParticle(particle) {
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true);
  ctx.fill()
}

const particle = {
  x: 0,
  y: 0,
  r: 50,
}

document.body.append(canvas)

drawParticle(particle)
