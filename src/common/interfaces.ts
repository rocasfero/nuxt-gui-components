export interface IPosition {
  x: number
  y: number
}

export interface ISize {
  w: number
  h: number
}

export interface INode {
  id: number | string
  title: string
  position: IPosition
  size: ISize
}
