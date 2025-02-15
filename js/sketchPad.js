class SketchPad {
  constructor(contaner, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
    contaner.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    this.isDrawing = false;
    this.path = [];

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouse = this.#getMouse(event)
      this.path = [mouse];
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (event) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(event)
        this.path.push(mouse);
        this.#redraw()
      }
    };

    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
  }

  #redraw(){
        this.ctx.clearRect(0, 0,
            this.canvas.width, this.canvas.height)
        draw.path(this.ctx, this.path)
  }

  #getMouse = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(event.clientX - rect.left),
      Math.round(event.clientY - rect.top),
    ];
  };
}
