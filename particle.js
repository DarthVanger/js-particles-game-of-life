import { state } from './state.js'
import { canvas, ctx } from './canvas.js'
import { add, remove, move } from './grid.js'
import { particleRadius } from './gameConstants.js'

export function drawParticle (particle) {
  ctx.beginPath()
  ctx.fillStyle = colorNumberToColorHex(particle.color)
  ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, true)
  ctx.fill()
}

export function createParticle(props) {
  const particle = {
    id: props.id,
    x: props.x,
    y: props.y,
    vx: 0,
    vy: 0,
    color: props.color,
    r: particleRadius,
  }

  return particle
}

export function createParticles(numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const dist = canvas.height / Math.sqrt(numParticles)
    const particlesInRow = Math.floor(canvas.width / dist)
    const row = Math.floor(i / particlesInRow)
    const col = i % particlesInRow
    const particle = createParticle({
      id: i,
      //x: col * dist + dist,
      //y: row * dist + dist,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: i % 3,
    })

    state.particles.push(particle)
    add(particle)
  }
}

export function updateParticle(particle) {
  remove(particle)

  particle.x += particle.vx
  particle.y += particle.vy
  teleportOnEdges(particle)

  add(particle)

}

export function renderParticles() {
  for (const particle of state.particles) {
    updateParticle(particle)
    drawParticle(particle)
  }
}

function teleportOnEdges(particle) {
  const r = particle.r
  if (particle.x < 0) {
    particle.x = canvas.width + particle.x
  }
  if (canvas.width - particle.x < 0) {
    particle.x = particle.x - canvas.width
  }
  if (particle.y < 0) {
    particle.y = canvas.height + particle.y
  }
  if (canvas.height - particle.y < 0) {
    particle.y = particle.y - canvas.height
  }
}

function colorNumberToColorHex(color) {
  switch (color) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'blue'
  }
}
