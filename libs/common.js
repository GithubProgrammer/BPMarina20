class GameObject extends createjs.Container {
  constructor(graphic) {
    super();

    if (graphic !== undefined) {
      this.graphic = graphic;
      this.addChild(this.graphic);

      var b = this.graphic.nominalBounds;
      this.setBounds(b.x, b.y, b.width, b.height);
    }
  }
}


function playSound(id, loop, offset) {
  return createjs.Sound.play(id, {
    'interrupt': createjs.Sound.INTERRUPT_EARLY,
    'loop': loop,
    'offset': offset
  });
}


var adjustThis = 0.0;

var isPC = isWindows();

function isWindows() {

  return navigator.platform.indexOf('Win') > -1

}

var isMAC = isMac();

function isMac() {

  return navigator.platform.indexOf('Mac') > -1

}

var isLINUX = isLinux();

function isLinux() {

  return navigator.platform.indexOf('Linux') > -1

}

var ua = navigator.userAgent.toLowerCase();

var check = function(r) {

  return r.test(ua);

};

var ua2 = navigator.userAgent;

var check2 = function(r2) {

  return r2.test(ua2);

};

var isChrome = check(/chrome/);

var isFirefox = check(/firefox/);

var isOpera = check(/opr/);

var isYandex = check(/yabrowser/);

var isEdge = check(/edge/);

var isCrOS = check2(/CrOS/); //  Chromium OS

if (isPC && isChrome) {
  if (!isEdge) {
    adjustThis = .1
  }
};

if (isPC && isFirefox) {
  adjustThis = .1
};

if (isMAC && isChrome) {
  adjustThis = .1
};

if (isMAC && isFirefox) {
  adjustThis = .1
};

if (isLINUX && isFirefox) {
  adjustThis = .1
};

if (isLINUX && isCrOS && isChrome) {
  adjustThis = .1
};

//----------------------------------------

if (createjs)

{

  createjs.Text.prototype._drawTextLine = function(ctx, text, y)

  {

    // Adjust text position only if textBaseline is "top"

    if (this.textBaseline === "top")

    {

      var lineHeight = this.lineHeight || this.getMeasuredLineHeight();

      y += lineHeight * adjustThis; // decrease number to move font up and increase to move down

    }

    // Chrome 17 will fail to draw the text if the last param is included but null, so we feed it a large value instead:

    if (this.outline) {
      ctx.strokeText(text, 0, y, this.maxWidth || 0xFFFF);
    } else {
      ctx.fillText(text, 0, y, this.maxWidth || 0xFFFF);
    }

  };

}
