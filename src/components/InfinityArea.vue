<template>
  <div class="infinity-area">
    <div
      :id="id"
      class="infinity-background"
      :style="backgroundStyle"
      @mousewheel="onMousewheel"
      @mousedown.left="onMousedown"
    ></div>
    <div class="infinity-content" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'
import { IPosition } from '~/common/interfaces'

@Component({})
export default class InfinityAreaComponent extends Vue {
  @Prop({ type: String }) id!: string

  @PropSync('position', { type: Object, default: () => ({ x: 0, y: 0 }) })
  propPosition!: IPosition

  private isDragging: boolean = false
  private prevPosition: IPosition = {
    x: 0,
    y: 0,
  }

  get backgroundStyle() {
    return {
      backgroundPosition: `${this.propPosition.x}px ${this.propPosition.y}px`,
      cursor: this.isDragging ? 'grabbing' : 'grab',
    }
  }

  get contentStyle() {
    return {
      left: `${this.propPosition.x}px`,
      top: `${this.propPosition.y}px`,
    }
  }

  onMousewheel(ev: MouseWheelEvent) {
    this.propPosition = {
      x: this.propPosition.x - ev.deltaX,
      y: this.propPosition.y - ev.deltaY,
    }
  }

  onMousedown(evt: MouseEvent) {
    this.isDragging = true
    document.addEventListener('mousemove', this.onMousemove)
    document.addEventListener('mouseup', this.onMouseup)
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
  }

  onMouseup(_evt: MouseEvent) {
    this.isDragging = false
    document.removeEventListener('mousemove', this.onMousemove)
    document.removeEventListener('mouseup', this.onMouseup)
  }
}
</script>

<style scoped>
.infinity-area {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #80a17d;
}

.infinity-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  background-image: linear-gradient(
      0deg,
      transparent 9%,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.2) 12%,
      transparent 13%,
      transparent 29%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.1) 31%,
      transparent 32%,
      transparent 49%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 51%,
      transparent 52%,
      transparent 69%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.1) 71%,
      transparent 72%,
      transparent 89%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1) 91%,
      transparent 92%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 9%,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.2) 12%,
      transparent 13%,
      transparent 29%,
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0.1) 31%,
      transparent 32%,
      transparent 49%,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(255, 255, 255, 0.1) 51%,
      transparent 52%,
      transparent 69%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.1) 71%,
      transparent 72%,
      transparent 89%,
      rgba(255, 255, 255, 0.1) 90%,
      rgba(255, 255, 255, 0.1) 91%,
      transparent 92%,
      transparent
    );
  background-size: 50px 50px;
  cursor: grab;
}

.infinity-content {
  position: relative;
}
</style>
