<template>
  <div :id="id" class="window" :style="windowStyle">
    <div class="title" :style="titleStyle" @mousedown="onMousedown">
      {{ title }}
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="handle" @mousedown="onResize"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'
import { IPosition, ISize } from '~/common/interfaces'

@Component({})
export default class WindowComponent extends Vue {
  @Prop({ type: [String, Number], required: true }) id!: string | number

  @Prop({ type: String }) title!: string

  @PropSync('position', { type: Object, default: () => ({ x: 0, y: 0 }) })
  propPosition!: IPosition

  @PropSync('size', { type: Object, default: () => ({ w: 0, h: 0 }) })
  propSize!: ISize

  private isDragging: boolean = false
  private isResizing: boolean = false
  private prevPosition: IPosition = {
    x: 0,
    y: 0,
  }

  get windowStyle() {
    return {
      height: `${this.propSize.h}px`,
      width: `${this.propSize.w}px`,
      left: `${this.propPosition.x}px`,
      top: `${this.propPosition.y}px`,
      opacity: this.isDragging || this.isResizing ? 0.5 : 1.0,
    }
  }

  get titleStyle() {
    return {
      cursor: this.isDragging ? 'grabbing' : 'grab',
    }
  }

  onMousedown(evt: MouseEvent) {
    this.isDragging = true
    document.addEventListener('mousemove', this.onMousemove)
    document.addEventListener('mouseup', this.onMouseup)
    this.$emit('pop', { id: this.id })
    this.prevPosition = {
      x: evt.clientX,
      y: evt.clientY,
    }
  }

  onResize(evt: MouseEvent) {
    this.isResizing = true
    document.addEventListener('mousemove', this.onMousemove)
    document.addEventListener('mouseup', this.onMouseup)
    this.$emit('pop', { id: this.id })
    this.prevPosition = {
      x: evt.clientX,
      y: evt.clientY,
    }
  }

  onMousemove(evt: MouseEvent) {
    if (this.isDragging) {
      this.propPosition = {
        x: this.propPosition.x + (evt.clientX - this.prevPosition.x),
        y: this.propPosition.y + (evt.clientY - this.prevPosition.y),
      }
      this.prevPosition = {
        x: evt.clientX,
        y: evt.clientY,
      }
    }
    if (this.isResizing) {
      this.propSize = {
        w: this.propSize.w + (evt.clientX - this.prevPosition.x),
        h: this.propSize.h + (evt.clientY - this.prevPosition.y),
      }
      this.prevPosition = {
        x: evt.clientX,
        y: evt.clientY,
      }
    }
  }

  onMouseup(_evt: MouseEvent) {
    this.isDragging = false
    this.isResizing = false
    document.removeEventListener('mousemove', this.onMousemove)
    document.removeEventListener('mouseup', this.onMouseup)
  }
}
</script>

<style scoped>
.window {
  position: absolute;
  display: inline-block;
  background-color: white;
  border: 1px solid #333;
  border-radius: 5px 5px 0 5px;
  overflow: hidden;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
}

.title {
  padding: 5px 10px;
  background-color: #666;
  color: white;
  border-bottom: 1px solid #333;
  user-select: none;
  cursor: grab;
}

.content {
  width: 100%;
}

.handle {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px double #666;
  border-bottom: 5px double #666;
  cursor: nwse-resize;
}
</style>
