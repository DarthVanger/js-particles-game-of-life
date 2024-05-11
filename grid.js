import { canvas } from './canvas.js'
import { universalPushForceRange, colorForceRange, particleRadius } from './gameConstants.js'

const numRows = Math.ceil(canvas.height / colorForceRange)
const numCols = Math.ceil(canvas.width / colorForceRange)

const cellHeight = canvas.height / numRows
const cellWidth = canvas.width / numCols

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
  //console.debug(`[getParticlesInRange] particle`, particle)
  //console.debug(`[getParticlesInRange] particle cell: ${i}, ${j}`)

  const topIndex = i - 1 >= 0 ? i - 1 : numRows - 1
  const leftIndex = j - 1 >= 0 ? j - 1 : numCols - 1
  const bottomIndex = i + 1 <= numRows - 1 ? i + 1 : 0
  const rightIndex = j + 1 <= numCols - 1 ? j + 1 : 0

  //console.debug(`[getParticlesInRange] neighbor cell indexes:
  //  topIndex: ${topIndex}; leftIndex: ${leftIndex};
  //  bottomIndex: ${bottomIndex}; rightIndex: ${rightIndex}
  //`)

  const sameCellParticles = cells[i][j].particles.filter(p => p.id !== particle.id)
  //console.debug('[getParticlesInRange] sameCellParticles: ', sameCellParticles)

  const topCellParticles = cells[topIndex][j].particles
  //console.debug('[getParticlesInRange] topCellParticles: ', topCellParticles)

  const bottomCellParticles = cells[bottomIndex][j].particles
  //console.debug('[getParticlesInRange] bottomCellParticles: ', bottomCellParticles)
    
  const leftCellParticles = cells[i][leftIndex].particles
  //console.debug('[getParticlesInRange] leftCellParticles: ', leftCellParticles)

  const rightCellParticles = cells[i][rightIndex].particles
  //console.debug('[getParticlesInRange] rightCellParticles: ', rightCellParticles)

  const topLeftCellParticles = cells[topIndex][leftIndex].particles
  //console.debug('[getParticlesInRange] topLeftCellParticles: ', topLeftCellParticles)

  const topRightCellParticles = cells[topIndex][rightIndex].particles
  //console.debug('[getParticlesInRange] topRightCellParticles: ', topRightCellParticles)

  const bottomLeftCellParticles = cells[bottomIndex][leftIndex].particles
  //console.debug('[getParticlesInRange] bottomLeftCellParticles: ', bottomLeftCellParticles)

  const bottomRightCellParticles = cells[bottomIndex][rightIndex].particles
  //console.debug('[getParticlesInRange] bottomRightCellParticles: ', bottomRightCellParticles)

  return [
    ...sameCellParticles,
    ...topCellParticles,
    ...bottomCellParticles,
    ...leftCellParticles,
    ...rightCellParticles,
    ...topLeftCellParticles,
    ...topRightCellParticles,
    ...bottomLeftCellParticles,
    ...bottomRightCellParticles,
  ]
   
}

const getParticleGridPosition = (particle) => {
  const j = Math.floor((particle.x) / cellWidth)
  const i = Math.floor((particle.y)  / cellHeight)
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
      cellBox.style.top = i * cellHeight + 'px'
      cellBox.style.left = j * cellWidth + 'px'

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
