// Vellum Shell's wallpaper transition (core/shaders/wallpaper-ink.frag), ported
// to WebGL: the new painting spreads over the old one like a drop of ink, with a
// ragged fbm edge and a darker "wet" rim that dries by the end.

const VERTEX = `
attribute vec2 pos;
varying vec2 vUv;
void main() {
  // top-left origin, like Qt's qt_TexCoord0
  vUv = vec2(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  gl_Position = vec4(pos, 0.0, 1.0);
}`

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;
uniform float progress;
uniform float aspect;
uniform float seed;
uniform vec2 origin;
uniform float fromAspect;
uniform float toAspect;
// object-position of each painting, so the first and last frame match the <img>
uniform vec2 fromFocus;
uniform vec2 toFocus;
uniform sampler2D fromTexture;
uniform sampler2D toTexture;

const float NOISE_AMOUNT = 0.22;
const float FIBRE_AMOUNT = 0.02;
const float FEATHER = 0.035;
const float RIM_WIDTH = 0.09;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 5; octave++) {
    sum += amplitude * valueNoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    amplitude *= 0.5;
  }
  return sum;
}

// object-fit: cover with an object-position, plus a zoom about the centre.
vec2 cover(vec2 uv, float imageAspect, float scale, vec2 focus) {
  vec2 s = 0.5 + (uv - 0.5) / scale;
  vec2 f = vec2(1.0);
  if (imageAspect > aspect) f.x = aspect / imageAspect;
  else f.y = imageAspect / aspect;
  return focus + (s - focus) * f;
}

void main() {
  vec2 uv = vUv;

  vec2 scaleVec = vec2(aspect, 1.0);
  vec2 delta = (uv - origin) * scaleVec;
  vec2 corner = max(origin, 1.0 - origin) * scaleVec;
  float dist = length(delta) / length(corner);

  float grain = fbm(uv * scaleVec * 3.2 + seed * 7.13);
  float fibre = fbm(uv * scaleVec * 14.0 - seed * 3.7);
  float shaped = dist + (grain - 0.5) * NOISE_AMOUNT * 2.0 + (fibre - 0.5) * FIBRE_AMOUNT * 2.0;

  float margin = NOISE_AMOUNT + FIBRE_AMOUNT + FEATHER;
  float front = mix(-margin, 1.0 + margin, progress);
  float reveal = 1.0 - smoothstep(front - FEATHER, front + FEATHER, shaped);

  vec4 fromColor = texture2D(fromTexture, cover(uv, fromAspect, 1.0 + 0.02 * progress, fromFocus));
  vec4 toColor = texture2D(toTexture, cover(uv, toAspect, 1.035 - 0.035 * progress, toFocus));

  float behind = clamp((front - shaped) / RIM_WIDTH, 0.0, 1.0);
  float rim = reveal * (1.0 - behind) * (1.0 - progress * progress);
  toColor.rgb *= 1.0 - 0.28 * rim;

  gl_FragColor = mix(fromColor, toColor, reveal);
}`

// Same as the shell: 1100 ms, InOutSine, spreading from just below the centre.
const DURATION = 1100
const ORIGIN = [0.5, 0.56]
const MAX_SIDE = 2560

const contexts = new WeakMap()

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
  return shader
}

function setup(canvas) {
  if (contexts.has(canvas)) return contexts.get(canvas)
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false })
  if (!gl) throw new Error('WebGL unavailable')

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const pos = gl.getAttribLocation(program, 'pos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const textures = [0, 1].map((unit) => {
    const tex = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, tex)
    // the paintings are not power-of-two sized
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    return tex
  })

  const u = (name) => gl.getUniformLocation(program, name)
  const ctx = {
    gl,
    textures,
    uniforms: Object.fromEntries(
      ['progress', 'aspect', 'seed', 'origin', 'fromAspect', 'toAspect', 'fromFocus', 'toFocus', 'fromTexture', 'toTexture'].map(
        (n) => [n, u(n)],
      ),
    ),
  }
  gl.uniform1i(ctx.uniforms.fromTexture, 0)
  gl.uniform1i(ctx.uniforms.toTexture, 1)
  contexts.set(canvas, ctx)
  return ctx
}

const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2

/**
 * Plays the ink transition on `canvas`. `onFirstFrame` runs once frame 0 is on
 * the canvas (time to show it); the promise resolves when the new painting fills it.
 * Throws if WebGL is unavailable, so the caller can just swap the images.
 */
export async function playInk(canvas, from, to, onFirstFrame) {
  const { gl, textures, uniforms: U } = setup(canvas)

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  const scale = Math.min(dpr, MAX_SIDE / Math.max(w, h))
  canvas.width = Math.round(w * scale)
  canvas.height = Math.round(h * scale)
  gl.viewport(0, 0, canvas.width, canvas.height)

  ;[from, to].forEach(({ image }, unit) => {
    gl.activeTexture(gl.TEXTURE0 + unit)
    gl.bindTexture(gl.TEXTURE_2D, textures[unit])
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
  })

  gl.uniform1f(U.aspect, w / h)
  gl.uniform1f(U.seed, Math.random() * 100)
  gl.uniform2f(U.origin, ...ORIGIN)
  gl.uniform1f(U.fromAspect, from.image.naturalWidth / from.image.naturalHeight)
  gl.uniform1f(U.toAspect, to.image.naturalWidth / to.image.naturalHeight)
  gl.uniform2f(U.fromFocus, ...from.focus)
  gl.uniform2f(U.toFocus, ...to.focus)

  const draw = (p) => {
    gl.uniform1f(U.progress, p)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  draw(0)
  onFirstFrame()

  await new Promise((resolve) => {
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / DURATION)
      draw(easeInOutSine(t))
      if (t < 1) requestAnimationFrame(tick)
      else resolve()
    }
    requestAnimationFrame(tick)
  })
}

// 'center 30%' → [0.5, 0.3]
export function parseFocus(position = 'center center') {
  const named = { left: 0, top: 0, center: 0.5, right: 1, bottom: 1 }
  const [x = 'center', y = 'center'] = position.split(/\s+/)
  const value = (v) => (v in named ? named[v] : parseFloat(v) / 100)
  return [value(x), value(y)]
}
