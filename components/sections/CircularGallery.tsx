'use client'

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl'
import { useEffect, useRef } from 'react'

type GL = Renderer['gl']

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t
}

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => func.apply(this, args), wait)
  }
}

interface ScreenSize { width: number; height: number }
interface Viewport { width: number; height: number }

interface MediaProps {
  geometry: Plane
  gl: GL
  image: string
  index: number
  length: number
  renderer: Renderer
  scene: Transform
  screen: ScreenSize
  viewport: Viewport
  bend: number
  borderRadius?: number
}

class Media {
  extra: number = 0
  geometry: Plane
  gl: GL
  image: string
  index: number
  length: number
  renderer: Renderer
  scene: Transform
  screen: ScreenSize
  viewport: Viewport
  bend: number
  borderRadius: number
  program!: Program
  plane!: Mesh
  scale!: number
  padding!: number
  width!: number
  widthTotal!: number
  x!: number
  speed: number = 0
  isBefore: boolean = false
  isAfter: boolean = false

  constructor({ geometry, gl, image, index, length, renderer, scene, screen, viewport, bend, borderRadius = 0 }: MediaProps) {
    this.geometry = geometry
    this.gl = gl
    this.image = image
    this.index = index
    this.length = length
    this.renderer = renderer
    this.scene = scene
    this.screen = screen
    this.viewport = viewport
    this.bend = bend
    this.borderRadius = borderRadius
    this.createShader()
    this.createMesh()
    this.onResize()
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true })
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    })

    const img = new Image()
    if (!this.image.startsWith('http')) {
      img.crossOrigin = 'anonymous'
    }
    img.src = this.image
    img.onload = () => {
      texture.image = img
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]
    }
    img.onerror = () => {
      console.warn(`[CircularGallery] Failed to load image: ${this.image}`)
    }
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
    this.plane.setParent(this.scene)
  }

  update(scroll: { current: number; last: number }, direction: 'right' | 'left') {
    this.plane.position.x = this.x - scroll.current - this.extra
    const x = this.plane.position.x
    const H = this.viewport.width / 2
    if (this.bend === 0) {
      this.plane.position.y = 0
      this.plane.rotation.z = 0
    } else {
      const B_abs = Math.abs(this.bend)
      const R = (H * H + B_abs * B_abs) / (2 * B_abs)
      const effectiveX = Math.min(Math.abs(x), H)
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX)
      if (this.bend > 0) {
        this.plane.position.y = -arc
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R)
      } else {
        this.plane.position.y = arc
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R)
      }
    }
    this.speed = scroll.current - scroll.last
    const planeOffset = this.plane.scale.x / 2
    const viewportOffset = this.viewport.width / 2
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal
      this.isBefore = this.isAfter = false
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal
      this.isBefore = this.isAfter = false
    }
  }

  onResize({ screen, viewport }: { screen?: ScreenSize; viewport?: Viewport } = {}) {
    if (screen) this.screen = screen
    if (viewport) this.viewport = viewport

    const w = this.screen.width
    // Desktop: 1024+ — original values unchanged
    // Tablet: 768–1023 — 15% smaller
    // Mobile: <768 — dedicated mobile sizing
    let scaleBase: number
    let paddingBase: number

    if (w >= 1024) {
      // Desktop — EXACTLY as before
      scaleBase = this.screen.height / 1500
      paddingBase = 2
    } else if (w >= 768) {
      // Tablet — 15% smaller, slightly tighter
      scaleBase = (this.screen.height / 1500) * 0.85
      paddingBase = 1.6
    } else {
      // Mobile — large center, smaller sides, tight spacing
      scaleBase = (this.screen.height / 1500) * 0.65
      paddingBase = 1.0
    }

    this.scale = scaleBase
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y]
    this.padding = paddingBase
    this.width = this.plane.scale.x + this.padding
    this.widthTotal = this.width * this.length
    this.x = this.width * this.index
  }
}

interface AppConfig {
  items?: { image: string }[]
  bend?: number
  borderRadius?: number
  scrollSpeed?: number
  scrollEase?: number
  onActiveChange?: (index: number) => void
}

class App {
  container: HTMLElement
  canvas!: HTMLCanvasElement
  scrollSpeed: number
  scroll: { ease: number; current: number; target: number; last: number; position?: number }
  onCheckDebounce: (...args: any[]) => void
  onActiveChange?: (index: number) => void
  renderer!: Renderer
  gl!: GL
  camera!: Camera
  scene!: Transform
  planeGeometry!: Plane
  medias: Media[] = []
  mediasImages: { image: string }[] = []
  screen!: { width: number; height: number }
  viewport!: { width: number; height: number }
  raf: number = 0
  boundOnResize!: () => void
  boundOnWheel!: (e: Event) => void
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void
  boundOnTouchUp!: () => void
  boundOnKeyDown!: (e: KeyboardEvent) => void
  isDown: boolean = false
  start: number = 0
  startY: number = 0
  axis: 'x' | 'y' | null = null
  lastActiveIndex: number = -1
  bend: number = 3
  borderRadius: number = 0.05

  constructor(container: HTMLElement, { items, bend = 3, borderRadius = 0.05, scrollSpeed = 2, scrollEase = 0.05, onActiveChange }: AppConfig) {
    this.container = container
    this.scrollSpeed = scrollSpeed
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 }
    this.onActiveChange = onActiveChange
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200)
    this.bend = bend
    this.borderRadius = borderRadius
    this.createRenderer()
    this.createCamera()
    this.createScene()
    this.onResize()
    this.createGeometry()
    this.createMedias(items)
    this.update()
    this.addEventListeners()
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.canvas = this.renderer.gl.canvas as HTMLCanvasElement
    this.container.appendChild(this.canvas)
  }

  createCamera() {
    this.camera = new Camera(this.gl)
    this.camera.fov = 45
    this.camera.position.z = 20
  }

  createScene() { this.scene = new Transform() }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 })
  }

  getResponsiveBend(): number {
    const w = this.screen.width
    if (w >= 1024) return this.bend        // Desktop — original
    if (w >= 768) return this.bend * 0.7   // Tablet — slightly flatter
    return this.bend * 0.45                 // Mobile — much flatter curve
  }

  createMedias(items: { image: string }[] | undefined) {
    const defaultItems = [
      { image: 'https://picsum.photos/seed/1/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/2/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/3/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/4/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/5/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/16/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/17/800/600?grayscale' },
      { image: 'https://picsum.photos/seed/8/800/600?grayscale' },
    ]
    const galleryItems = items && items.length ? items : defaultItems
    this.mediasImages = [...galleryItems]
    const responsiveBend = this.getResponsiveBend()
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: this.mediasImages.length,
      renderer: this.renderer, scene: this.scene, screen: this.screen, viewport: this.viewport,
      bend: responsiveBend, borderRadius: this.borderRadius
    }))
  }

  getActiveIndex(): number {
    if (!this.medias[0]) return 0
    const width = this.medias[0].width
    if (width === 0) return 0
    const scrollPos = this.scroll.current
    const itemIndex = Math.round(Math.abs(scrollPos) / width)
    const clampedIndex = ((itemIndex % this.mediasImages.length) + this.mediasImages.length) % this.mediasImages.length
    return clampedIndex
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true
    this.scroll.position = this.scroll.current
    this.axis = null
    if ('touches' in e) {
      this.start = e.touches[0].clientX
      this.startY = e.touches[0].clientY
    } else {
      this.start = e.clientX
      this.startY = e.clientY
    }
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return
    const point = 'touches' in e ? e.touches[0] : (e as MouseEvent)
    const x = point.clientX
    const y = point.clientY

    if (!this.axis) {
      const dx = Math.abs(x - this.start)
      const dy = Math.abs(y - this.startY)
      if (dx < 8 && dy < 8) return
      this.axis = dx > dy ? 'x' : 'y'
    }

    // Vertical gestures scroll the page — never react to them
    if (this.axis !== 'x') return

    e.preventDefault()
    const distance = (this.start - x) * (this.scrollSpeed * 0.025)
    this.scroll.target = (this.scroll.position ?? 0) + distance
  }

  onTouchUp() { this.isDown = false; this.axis = null; this.onCheck() }

  onWheel(e: Event) {
    e.preventDefault()
    const wheelEvent = e as WheelEvent
    const delta = wheelEvent.deltaY || (wheelEvent as any).wheelDelta || (wheelEvent as any).detail
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2
    this.onCheckDebounce()
  }

  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowRight': e.preventDefault(); this.scroll.target += this.scrollSpeed * 5; this.onCheckDebounce(); break
      case 'ArrowLeft': e.preventDefault(); this.scroll.target -= this.scrollSpeed * 5; this.onCheckDebounce(); break
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return
    const width = this.medias[0].width
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width)
    const item = width * itemIndex
    this.scroll.target = this.scroll.target < 0 ? -item : item
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }
    this.renderer.setSize(this.screen.width, this.screen.height)
    this.camera.perspective({ aspect: this.screen.width / this.screen.height })
    const fov = (this.camera.fov * Math.PI) / 180
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z
    const width = height * this.camera.aspect
    this.viewport = { width, height }

    // Recalculate responsive bend on resize
    const responsiveBend = this.getResponsiveBend()
    if (this.medias) {
      this.medias.forEach(media => {
        media.bend = responsiveBend
        media.onResize({ screen: this.screen, viewport: this.viewport })
      })
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease)
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left'
    if (this.medias) this.medias.forEach(media => media.update(this.scroll, direction))
    this.renderer.render({ scene: this.scene, camera: this.camera })
    this.scroll.last = this.scroll.current

    const activeIdx = this.getActiveIndex()
    if (activeIdx !== this.lastActiveIndex) {
      this.lastActiveIndex = activeIdx
      this.onActiveChange?.(activeIdx)
    }

    this.raf = window.requestAnimationFrame(this.update.bind(this))
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnWheel = this.onWheel.bind(this)
    this.boundOnTouchDown = this.onTouchDown.bind(this)
    this.boundOnTouchMove = this.onTouchMove.bind(this)
    this.boundOnTouchUp = this.onTouchUp.bind(this)
    this.boundOnKeyDown = this.onKeyDown.bind(this)
    window.addEventListener('resize', this.boundOnResize)
    this.canvas.addEventListener('mousewheel', this.boundOnWheel, { passive: false })
    this.canvas.addEventListener('wheel', this.boundOnWheel, { passive: false })
    this.canvas.addEventListener('mousedown', this.boundOnTouchDown)
    this.canvas.addEventListener('mousemove', this.boundOnTouchMove)
    this.canvas.addEventListener('mouseup', this.boundOnTouchUp)
    this.canvas.addEventListener('mouseleave', this.boundOnTouchUp)
    this.canvas.addEventListener('touchstart', this.boundOnTouchDown, { passive: false })
    this.canvas.addEventListener('touchmove', this.boundOnTouchMove, { passive: false })
    this.canvas.addEventListener('touchend', this.boundOnTouchUp)
    this.container?.addEventListener('keydown', this.boundOnKeyDown)
  }

  destroy() {
    window.cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.boundOnResize)
    this.canvas?.removeEventListener('mousewheel', this.boundOnWheel)
    this.canvas?.removeEventListener('wheel', this.boundOnWheel)
    this.canvas?.removeEventListener('mousedown', this.boundOnTouchDown)
    this.canvas?.removeEventListener('mousemove', this.boundOnTouchMove)
    this.canvas?.removeEventListener('mouseup', this.boundOnTouchUp)
    this.canvas?.removeEventListener('mouseleave', this.boundOnTouchUp)
    this.canvas?.removeEventListener('touchstart', this.boundOnTouchDown)
    this.canvas?.removeEventListener('touchmove', this.boundOnTouchMove)
    this.canvas?.removeEventListener('touchend', this.boundOnTouchUp)
    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    if (this.container) this.container.removeEventListener('keydown', this.boundOnKeyDown)
  }
}

interface CircularGalleryProps {
  items?: { image: string }[]
  bend?: number
  borderRadius?: number
  scrollSpeed?: number
  scrollEase?: number
  onActiveChange?: (index: number) => void
}

export default function CircularGallery({
  items,
  bend = 3,
  borderRadius = 0.05,
  scrollSpeed = 2,
  scrollEase = 0.05,
  onActiveChange,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    const app = new App(containerRef.current, { items, bend, borderRadius, scrollSpeed, scrollEase, onActiveChange })
    return () => app.destroy()
  }, [items, bend, borderRadius, scrollSpeed, scrollEase, onActiveChange])
  return (
    <div
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular menu gallery. Use Left and Right Arrow keys to navigate."
    />
  )
}
