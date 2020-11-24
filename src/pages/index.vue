<template>
  <InfinityArea :id="'ia'" :position.sync="position">
    <Window
      v-for="node in nodes"
      :id="node.id"
      :key="node.title"
      :title="node.title"
      :position.sync="node.position"
      :size.sync="node.size"
      @pop="pop"
    >
      <div></div>
    </Window>
    <div class="fixedBox">
      <input v-model="newTitle" type="text" placeholder="input new title" />
      <button
        class="button"
        :disabled="newTitle.trim() === ''"
        @click="addNode"
      >
        Add
      </button>
    </div>
  </InfinityArea>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { nanoid } from 'nanoid'
import { INode, IPosition } from '~/common/interfaces'
import InfinityArea from '~/components/InfinityArea.vue'
import Window from '~/components/Window.vue'

@Component({
  components: {
    InfinityArea,
    Window,
  },
})
export default class IndexPageComponent extends Vue {
  position: IPosition = {
    x: 0,
    y: 0,
  }

  newTitle: string = ''

  nodes: INode[] = [
    {
      id: 1,
      title: 'window-01',
      position: {
        x: 10,
        y: 10,
      },
      size: {
        w: 250,
        h: 250,
      },
    },
    {
      id: 2,
      title: 'window-02',
      position: {
        x: 300,
        y: 10,
      },
      size: {
        w: 250,
        h: 250,
      },
    },
  ]

  addNode() {
    const node = {
      id: nanoid(),
      title: this.newTitle,
      position: {
        x: 10 + Math.random() * 100,
        y: 10 + Math.random() * 100,
      },
      size: {
        w: 250,
        h: 250,
      },
    }
    this.nodes.push(node)
    this.newTitle = ''
  }

  pop(payload: any) {
    const node = this.nodes.find((node) => node.id === payload.id)
    if (node === undefined) return

    this.nodes = this.nodes.filter((node) => node.id !== payload.id)
    this.nodes.push(node)
  }
}
</script>

<style scoped>
.fixedBox {
  margin: 20px;
  position: fixed;
  right: 0;
  top: 0;
}
</style>
