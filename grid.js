import { canvas } from './canvas.js'
import { universalPushForceRange, colorForceRange, particleRadius } from './gameConstants.js'

const cellWidth = colorForceRange
const cellHeight = colorForceRange
const numRows = Math.ceil(canvas.height / cellHeight) + 2
const numCols = Math.ceil(canvas.width / cellWidth) + 2

const cells = createCells()

//createGridGraphics()

export const add = (particle) => {
  const { i, j } = getParticleGridPosition(particle)

  if (i < 0 || j < 0 || i > numRows || j > numCols) {
    console.error('trying to add particle out of grid bounds')
    console.error(particle)
    console.error('particle grid position: ', i, j)
  }
  //console.debug(`add particle (${particle.x}, ${particle.y}) at [${i}][${j}]`)
  cells[i][j].particles.push(particle)
}

export const move = (particle) => {
  remove(particle)
  add(particle)
}

export const remove = (particle) => {
  const { i, j } = getParticleGridPosition(particle)

  if (i < 0 || j < 0 || i > numRows || j > numCols) {
    console.error('trying to remove particle out of grid bounds')
    console.error(particle)
    console.error('particle grid position: ', i, j)
  }

  const particleIndex = cells[i][j].particles.indexOf(particle)
  if (particleIndex === -1) {
    throw new Error('Trying to remove particle, which is not in the grid (or is at wrong cell)')
  }
  cells[i][j].particles.splice(particleIndex, 1)
}

export const getParticlesInRange = (particle) => {
  let particles = []
  const { i, j } = getParticleGridPosition(particle)

  particles = particles.concat(cells[i][j].particles.filter(p => p.id !== particle.id))

  const topIndex = i - 1 > 0 ? i - 1 : numRows - 1
  const leftIndex = j - 1 > 0 ? j - 1 : numCols - 1
  const bottomIndex = i + 1 > numRows - 1 ? 0 : i + 1
  const rightIndex = j + 1 > numCols - 1 ? 0 : j + 1

  particles = particles.concat(cells[topIndex][j].particles)
  particles = particles.concat(cells[bottomIndex][j].particles)
  particles = particles.concat(cells[i][leftIndex].particles)
  particles = particles.concat(cells[i][rightIndex].particles)
  particles = particles.concat(cells[topIndex][leftIndex].particles)
  particles = particles.concat(cells[topIndex][rightIndex].particles)
  particles = particles.concat(cells[bottomIndex][leftIndex].particles)
  particles = particles.concat(cells[bottomIndex][rightIndex].particles)

  return particles
   
}

const getParticleGridPosition = (particle) => {
  const j = Math.floor((particle.x) / cellWidth) + 1
  const i = Math.floor((particle.y)  / cellHeight) + 1
  return { i, j }
}

export function updateGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      cells[i][j].element.innerText = cells[i][j].particles.length
    }
  }
}

function createGridGraphics() {
  const gridElement = document.createElement('div')

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cellBox = document.createElement('div')
      cellBox.style.display = 'flex'
      cellBox.style.alignItems = 'center'
      cellBox.style.justifyContent = 'center'
      cellBox.style.width = cellWidth + 'px'
      cellBox.style.height = cellHeight + 'px'
      cellBox.style.border = '1px solid black'
      cellBox.style.position = 'absolute'
      cellBox.style.top = (i - 1) * cellHeight + 'px'
      cellBox.style.left = (j - 1) * cellWidth + 'px'

      cells[i][j].element = cellBox

      gridElement.append(cellBox)
    }
  }

  document.body.append(gridElement)
}

function createCells() {
  const cells = []
  for (let i = 0; i < numRows; i++) {
    const colCells = []
    for (let j = 0; j < numCols; j++) {
      const emptyCell = { particles: [] }
      colCells.push(emptyCell)
    }
    cells.push(colCells)
  }

  return cells
}
