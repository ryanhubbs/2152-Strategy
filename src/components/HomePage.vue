<template>
  <div class="page-container">
    <br>
    <h1>2152 SMASH Strategy</h1>
    <img :src="absoluteLogoPath" alt="Cannot load logo file" class="center" width="300" height="75">
    <br>
  <div id="app">
    <div class="flex-row">
      <div class="source">
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          v-model:image="image"
          :width="781"
          :height="339"
          :stroke-type="strokeType"
          :line-cap="lineCap"
          :line-join="lineJoin"
          :fill-shape="fillShape"
          :eraser="eraser"
          :lineWidth="line"
          :color="color"
          :background-color="backgroundColor"
          :background-image="backgroundImage"
          :watermark="watermark"
          :initial-image="initialImage"
          saveAs="png"
          :lock="disabled"
          @mousemove="getCoordinate($event)"
          :additional-images="additionalImages"
        />
        <div class="button-container">
          <button type="button" @click.prevent="disabled = !disabled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path
                v-if="!disabled"
                d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
              />
              <path
                v-else
                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
              />
            </svg>
            <span v-if="!disabled">Lock</span>
            <span v-else>Unlock</span>
          </button>
          <button type="button" @click.prevent="$refs.VueCanvasDrawing.undo()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-counterclockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
              />
            </svg>
            Undo
          </button>
          <button type="button" @click.prevent="$refs.VueCanvasDrawing.redo()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
              />
            </svg>
            Redo
          </button>
          <button type="button" @click.prevent="$refs.VueCanvasDrawing.reset()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
              />
            </svg>
            Reset
          </button>
        </div>
        <div class="button-container">
          <button type="button" @click.prevent="eraser = !eraser">
            <span v-if="eraser">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eraser"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                />
              </svg>
              Eraser
            </span>
            <span v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                />
              </svg>
              Draw
            </span>
          </button>
          <select v-model="line">
            <option v-for="n in 25" :key="'option-' + n" :value="n">
              {{ n }}
            </option>
          </select>
          <input type="color" v-model="color" />
          <select v-model="strokeType">
            <option value="dash">Dash</option>
            <option value="line">Straight Line</option>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="half_triangle">Half Triangle</option>
          </select>
        </div>
      </div>
    </div>
  </div>

  <br><br><textarea name="notes" rows="15" cols="110" /><br><br>
</div>
  <footer>
    <h5>Version 1.0.0</h5>
  </footer>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";
import { defineComponent, computed } from 'vue';

export default {
  name: "StrategyCanvas",
  components: {
    VueDrawingCanvas,
  },
  setup() {
    const absoluteLogoPath = computed(() => `${import.meta.env.BASE_URL}assets/home_icon.png`);
    return { absoluteLogoPath };
  },
  data() {
    return {
      initialImage: [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
          coordinates: [],
          color: "#000000",
          width: 5,
          fill: false,
        },
      ],
      x: 0,
      y: 0,
      image: "",
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#000000",
      strokeType: "dash",
      lineCap: "square",
      lineJoin: "miter",
      backgroundColor: "#FFFFFF",
      backgroundImage: computed(() => `${import.meta.env.BASE_URL}assets/field.png`),
      watermark: null,
      additionalImages: [],
    };
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
  },
  methods: {
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    getCoordinate(event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
      this.x = coordinates.x;
      this.y = coordinates.y;
    },
    getStrokes() {
      window.localStorage.setItem(
        "vue-drawing-canvas",
        JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes())
      );
      alert(
        "Strokes saved, reload your browser to see the canvas with previously saved image"
      );
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas");
      alert("Strokes cleared from local storage");
    },
  },
};
</script>

<style>
h1 {
  margin-top: 0;
}
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
body {
  font-family: "Roboto", sans-serif;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.button-container {
  display: flex;
  flex-direction: row;
}
.button-container > * {
  margin-top: 15px;
  margin-right: 10px;
}

hr-foot {
    border: 0;
    height: 1px;
}

canvas {
    cursor: crosshair;
    border: 1px solid #000000;
}
</style>
