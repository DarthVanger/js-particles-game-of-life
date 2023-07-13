import { gameLoop } from './gameLoop.js'
import { state } from './state.js'
import { createParticles } from './particle.js'

const numParticles = 300

createParticles(numParticles)
gameLoop()

