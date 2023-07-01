export const canvas = document.createElement('canvas')
export const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

document.body.append(canvas)
