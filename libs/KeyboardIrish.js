class KeyboardIrish extends GameObject {
  constructor(__graphic) {
    super(__graphic);
    this.letters = [
      ['q', 'w', 'e', 'é', 'r', 't', 'y', 'u', 'ú', 'i', 'í', 'o', 'ó', 'p', '?', 'a', 'á', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '‘', '’', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '!', '/', '-'],
      ['Q', 'W', 'E', 'É', 'R', 'T', 'Y', 'U', 'Ú', 'I', 'Í', 'O', 'Ó', 'P', '?', 'A', 'Á', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '‘', '’', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '!', '/', '-']
    ];
    this.shiftState = false;
    this.mcKeyboard = this.graphic;
    this.init();
  }

  init() {
    this.mcKeyboard.btReset.addEventListener('click', this.deleteLetter.bind(this));
    this.mcKeyboard.btReset.letter = "del";
    this.mcKeyboard.btShift.addEventListener('click', this.shiftSwitch.bind(this));
    this.mcKeyboard.btReset.mouseChildren = false;
    this.mcKeyboard.btShift.mouseChildren = false;
    this.mcKeyboard.btReset.mouseEnabled = false;
    this.mcKeyboard.btShift.mouseEnabled = false;
    var ref;
    for (var t = 0; t < this.letters[0].length; t++) {
      ref = this.mcKeyboard['l' + (t + 1)];
      ref.addEventListener('click', this.onKeybordKeySelected.bind(this));
      ref.mouseChildren = false;
      ref.mouseEnabled = false;
    }
    this.shiftOff();
  }

  deleteLetter(e) {
    var keyEvent = new createjs.Event("keydown");
    keyEvent.letter = e.currentTarget.letter;
    this.dispatchEvent(keyEvent);
  }

  onKeybordKeySelected(e) {
    var keyEvent = new createjs.Event("keydown");
    keyEvent.letter = e.currentTarget.tLetter.text;
    this.dispatchEvent(keyEvent);
  }

  shiftSwitch(e = null) {
    if (!this.shiftState) {
      this.shiftOn();
    } else {
      this.shiftOff();
    }
  }

  // ------------------- PUBLIC FUNCTIONS -------------------

  shiftOff() {
    this.shiftState = false;
    var ref;
    for (var t = 0; t < this.letters[0].length; t++) {
      ref = this.mcKeyboard['l' + (t + 1)];
      ref.tLetter.text = this.letters[0][t];
	  ref.tLetter.font = "18px Sassoon Infant Md";
      ref.letter = this.letters[0][t];
    }
  }

  shiftOn() {
    this.shiftState = true;
    var ref;
    for (var t = 0; t < this.letters[1].length; t++) {
      ref = this.mcKeyboard['l' + (t + 1)];
      ref.tLetter.text = this.letters[1][t];
      ref.letter = this.letters[1][t];
    }
  }
  
  // disable all but delete button
  enableDelMode() {
    this.disable();
    this.mcKeyboard.btReset.cursor = "pointer";
    this.mcKeyboard.btReset.mouseEnabled = true;
  }

  enable() {
    this.mcKeyboard.btReset.cursor = "pointer";
    this.mcKeyboard.btShift.cursor = "pointer";
    this.mcKeyboard.btReset.mouseEnabled = true;
    this.mcKeyboard.btShift.mouseEnabled = true;
    var ref;
    for (var t = 0; t < this.letters[0].length; t++) {
      ref = this.mcKeyboard['l' + (t + 1)];
      ref.mouseEnabled = true;
      ref.cursor = "pointer";
    }
    console.log("enable()");
  }

  disable() {
    this.mcKeyboard.btReset.cursor = "default";
    this.mcKeyboard.btShift.cursor = "default";
    this.mcKeyboard.btReset.mouseEnabled = false;
    this.mcKeyboard.btShift.mouseEnabled = false;
    var ref;
    for (var t = 0; t < this.letters[0].length; t++) {
      ref = this.mcKeyboard['l' + (t + 1)];
      ref.mouseEnabled = false;
      ref.cursor = "default";
    }
  }

}
