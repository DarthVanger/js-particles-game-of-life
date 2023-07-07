import { gameLoop } from './gameLoop.js'
import { state } from './state.js'
import { createParticles } from './particle.js'

const numParticles = 100

createParticles(numParticles)
gameLoop()

