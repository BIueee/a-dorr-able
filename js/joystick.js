let joystick = document.getElementById('joystick');
let container = document.getElementById('joystick-container');

let origin = { x: 0, y: 0 };
let delta = { x: 0, y: 0 };

let threshold = 20; // minimum distance to count as input

let keys = {
  left: false,
  right: false,
  up: false,
  down: false,
};

function updateKeyState() {
  Key.LEFT = keys.left;
  Key.RIGHT = keys.right;
  Key.UP = keys.up;
  Key.DOWN = keys.down;
}

function handleMove(e) {
  let touch = e.touches[0];
  let rect = container.getBoundingClientRect();

  let x = touch.clientX - rect.left;
  let y = touch.clientY - rect.top;

  delta.x = x - origin.x;
  delta.y = y - origin.y;

  // Apply limits to the joystick knob
  let angle = Math.atan2(delta.y, delta.x);
  let distance = Math.min(Math.hypot(delta.x, delta.y), 40);

  let knobX = distance * Math.cos(angle);
  let knobY = distance * Math.sin(angle);

  joystick.style.left = `${origin.x + knobX - 30}px`;
  joystick.style.top = `${origin.y + knobY - 30}px`;

  // Set key states
  keys.left = knobX < -threshold;
  keys.right = knobX > threshold;
  keys.up = knobY < -threshold;
  keys.down = knobY > threshold;

  updateKeyState();
}

container.addEventListener('touchstart', (e) => {
  let rect = container.getBoundingClientRect();
  origin.x = rect.width / 2;
  origin.y = rect.height / 2;
  handleMove(e);
}, { passive: true });

container.addEventListener('touchmove', handleMove, { passive: true });

container.addEventListener('touchend', () => {
  keys.left = keys.right = keys.up = keys.down = false;
  updateKeyState();
  joystick.style.left = '30px';
  joystick.style.top = '30px';
});
