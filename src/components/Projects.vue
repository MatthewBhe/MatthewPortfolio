<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue"
import { useI18n } from "vue-i18n"

const { t, locale } = useI18n()

// Données "tech" (ne dépendent pas de la langue)
const baseProjects = [
  {
    img: "/assets/parser.webp",
    link: "https://github.com/MatthewBhe/THL-Final-Project"
  },
  {
    img: "/assets/tower-of-hero.webp",
    link: "https://github.com/MatthewBhe/Java-Final-Project"
  },
  {
    img: "/assets/ninja-spectral.webp",
    link: ""
  }
]

// Données affichées (dépendent de la langue) -> computed
const projects = computed(() =>
  baseProjects.map((p, i) => ({
    ...p,
    title: t(`projects.items.${i}.title`),
    desc: t(`projects.items.${i}.desc`)
  }))
)

const N = computed(() => projects.value.length)
const repeated = computed(() => [...projects.value, ...projects.value, ...projects.value])

const viewportRef = ref<HTMLElement | null>(null)
const slideWidth = ref(0)
const slidesPerView = ref(2)

const duration = 450
const current = ref(0)
const transitioning = ref(true)

const isPointerDown = ref(false)
const startX = ref(0)
const startY = ref(0)
const dragX = ref(0)
const lockedClick = ref(false)

function measure() {
  if (!viewportRef.value) return
  const w = window.innerWidth
  slidesPerView.value = w < 640 ? 1 : 2
  slideWidth.value = viewportRef.value.clientWidth / slidesPerView.value
}

function go(delta: number) {
  if (!slideWidth.value) measure()
  transitioning.value = true
  current.value += delta

  window.setTimeout(() => {
    const n = N.value
    if (current.value >= 2 * n) {
      transitioning.value = false
      current.value -= n
    } else if (current.value < n) {
      transitioning.value = false
      current.value += n
    }
  }, duration + 20)
}

const next = () => go(1)
const prev = () => go(-1)

function onPointerDown(e: any) {
  isPointerDown.value = true
  transitioning.value = false
  dragX.value = 0
  lockedClick.value = false

  const p = "touches" in e ? e.touches[0] : e
  startX.value = p.clientX
  startY.value = p.clientY
}

function onPointerMove(e: any) {
  if (!isPointerDown.value) return
  const p = "touches" in e ? e.touches[0] : e
  const dx = p.clientX - startX.value
  const dy = p.clientY - startY.value

  if (Math.abs(dy) > Math.abs(dx) * 1.2) return

  dragX.value = dx
  if (Math.abs(dx) > 8) lockedClick.value = true
}

function onPointerUpCancel() {
  if (!isPointerDown.value) return
  isPointerDown.value = false

  const threshold = Math.max(40, slideWidth.value * 0.2)
  if (Math.abs(dragX.value) > threshold) {
    if (dragX.value < 0) next()
    else prev()
  } else {
    transitioning.value = true
  }
  dragX.value = 0
}

function onSlideClick(ev: MouseEvent) {
  if (lockedClick.value) {
    ev.preventDefault()
    ev.stopPropagation()
  }
}

// Init : on démarre au milieu (N) quand N est connu
function resetIndex() {
  current.value = N.value
  transitioning.value = true
}

// Si la langue change, on reset l’index (optionnel mais ça évite un “saut” visuel)
watch(locale, () => {
  resetIndex()
})

onMounted(() => {
  measure()
  resetIndex()

  const ro = new ResizeObserver(measure)
  if (viewportRef.value) ro.observe(viewportRef.value)

  window.addEventListener("resize", measure)

  onBeforeUnmount(() => {
    ro.disconnect()
    window.removeEventListener("resize", measure)
  })
})
</script>

<template>
  <section id="projets" class="section relative" data-reveal>
    <div class="container">
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="text-2xl sm:text-3xl font-bold">{{ t("projects.title") }}</h2>
        <a
          href="https://github.com/MatthewBhe"
          target="_blank"
          class="text-sm hover:text-brand-accent"
        >
          {{ t("projects.more") }}
        </a>
      </div>

      <div class="relative overflow-visible">
        <div class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#101820] to-transparent z-[2]"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#101820] to-transparent z-[2]"></div>

        <div
          ref="viewportRef"
          class="overflow-hidden select-none"
          style="touch-action: pan-y;"
          @pointerdown.passive="onPointerDown"
          @pointermove.passive="onPointerMove"
          @pointerup.passive="onPointerUpCancel"
          @pointercancel.passive="onPointerUpCancel"
          @touchstart.passive="onPointerDown"
          @touchmove.passive="onPointerMove"
          @touchend.passive="onPointerUpCancel"
          @touchcancel.passive="onPointerUpCancel"
        >
          <div
            class="flex cursor-grab active:cursor-grabbing"
            :style="{
              transform: `translateX(${-(current - N) * slideWidth + dragX}px)`,
              transition: transitioning ? `transform ${duration}ms ease` : 'none'
            }"
          >
            <a
              v-for="(p, i) in repeated"
              :key="i"
              :href="p.link || undefined"
              :target="p.link ? '_blank' : undefined"
              class="group shrink-0 px-3 box-border"
              :class="!p.link ? 'pointer-events-none opacity-95' : ''"
              :style="{ width: slideWidth + 'px' }"
              @click="onSlideClick"
            >
              <div class="card overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-accent/70">
                <div class="relative">
                  <img
                    :src="p.img"
                    :alt="p.title"
                    class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  >
                  <div class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold">{{ p.title }}</h3>
                    <span
                      class="px-3 py-1 rounded-full text-xs bg-brand-accent text-brand-dark font-medium opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition"
                    >
                      {{ t("projects.view") }}
                    </span>
                  </div>
                  <p class="text-sm text-white/70 mt-2">{{ p.desc }}</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <button @click="prev" class="arrow-btn left-arrow" :aria-label="t('projects.prev') || 'Précédent'">←</button>
        <button @click="next" class="arrow-btn right-arrow" :aria-label="t('projects.next') || 'Suivant'">→</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  color: #fff;
  transition: transform 180ms ease, background 180ms ease;
  overflow: hidden;
  height: 44px;
  width: 44px;
}
.left-arrow  { left: -3.5rem; }
.right-arrow { right: -3.5rem; }

.arrow-btn:hover {
  transform: translateY(-50%) scale(1.1);
  background: rgba(255,255,255,0.12);
}
.arrow-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255,255,255,0) 40%,
    rgba(255,255,255,0.55) 50%,
    rgba(255,255,255,0) 60%
  );
  transform: translateX(-120%) skewX(-12deg);
  transition: transform 600ms ease;
  pointer-events: none;
  mix-blend-mode: screen;
}
.arrow-btn:hover::after { transform: translateX(120%) skewX(-12deg); }

@media (max-width: 640px) {
  .arrow-btn { height: 36px; width: 36px; }
  .left-arrow  { left: max(0.5rem, env(safe-area-inset-left)); }
  .right-arrow { right: max(0.5rem, env(safe-area-inset-right)); }
  .arrow-btn:hover { transform: translateY(-50%) scale(1.08); }
}
</style>
