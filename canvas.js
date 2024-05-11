export const canvas = document.createElement('canvas')
export const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth * 0.95
canvas.height = window.innerHeight * 0.95

document.body.append(canvas)
