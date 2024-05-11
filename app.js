import { gameLoop } from './gameLoop.js'
import { state } from './state.js'
import { createParticles } from './particle.js'
import { numParticles } from './gameConstants.js'
import { debugEdges } from './debug.js'

//debugEdges()
createParticles(numParticles)
gameLoop()

