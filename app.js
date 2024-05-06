import { gameLoop } from './gameLoop.js'
import { state } from './state.js'
import { createParticles } from './particle.js'
import { numParticles } from './gameConstants.js'

createParticles(numParticles)
gameLoop()

