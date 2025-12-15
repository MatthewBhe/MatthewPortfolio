<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import TiltedCard from "./ui/TiltedCard.vue"

const { t } = useI18n()

const skills = [
  { name: "Java",           slug: "java",          color: "007396" },
  { name: "HTML5",          slug: "html5",         color: "E34F26" },
  { name: "CSS3",           slug: "css3",          color: "1572B6" },
  { name: "JavaScript",     slug: "javascript",    color: "F7DF1E" },
  { name: "Android Studio", slug: "androidstudio", color: "3DDC84" },
  { name: "Vue.js",         slug: "vuedotjs",      color: "4FC08D" },
  { name: "Nuxt.js",        slug: "nuxtdotjs",     color: "00DC82" },
  { name: "Node.js",        slug: "nodedotjs",     color: "339933" },
  { name: "C",              slug: "c",             color: "A8B9CC" },
  { name: "PHP",            slug: "php",           color: "777BB4" },
  { name: "Python",         slug: "python",        color: "3776AB" },
  { name: "GitHub",         slug: "github",        color: "FFFFFF" }
]

const DEVICON_SLUGS: Record<string, string | null> = {
  java: "java",
  html5: "html5",
  css3: "css3",
  javascript: "javascript",
  androidstudio: "androidstudio",
  vuedotjs: "vuejs",
  nuxtdotjs: "nuxtjs",
  nodedotjs: "nodejs",
  c: "c",
  php: "php",
  python: "python",
  github: null
}

const deviconUrl = (devSlug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devSlug}/${devSlug}-original.svg`

const iconifyUrl = (slug: string, color = "FFFFFF") =>
  `https://api.iconify.design/simple-icons:${slug}.svg?color=%23${color}`

const iconUrl = (slug: string, color: string) => {
  const devSlug = DEVICON_SLUGS[slug]
  if (devSlug) return deviconUrl(devSlug)
  return iconifyUrl(slug, color)
}

// ✅ reveal garanti dans l'ordre
const sectionRef = ref<HTMLElement | null>(null)
const revealed = ref(false)

onMounted(() => {
  if (!sectionRef.value) return

  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some(e => e.isIntersecting)) {
        revealed.value = true
        io.disconnect()
      }
    },
    { threshold: 0.18 }
  )

  io.observe(sectionRef.value)

  onBeforeUnmount(() => io.disconnect())
})

const delayMs = (i: number) => Math.min(i * 80, 420) // ordre stable + cap
</script>

<template>
  <section
    id="competences"
    ref="sectionRef"
    class="section relative overflow-visible"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[35%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(155,92,255,0.12)_0%,transparent_65%)] blur-2xl -z-10"
    ></div>

    <div class="container relative z-10">
      <h2 class="text-2xl sm:text-3xl font-bold mb-6">
        {{ t('skills.title') }}
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
          v-for="(s, i) in skills"
          :key="s.slug || i"
          class="overflow-visible will-change-transform"
          :class="revealed ? 'skill-show' : 'skill-hidden'"
          :style="{ transitionDelay: revealed ? `${delayMs(i)}ms` : '0ms' }"
        >
          <TiltedCard
            :image-src="iconUrl(s.slug, s.color)"
            :alt-text="s.name"
            :caption-text="s.name"
            container-height="160px"
            image-height="140px"
            image-width="140px"
            :rotate-amplitude="14"
            :scale-on-hover="1.08"
            glare-color="#9B5CFF"
            :glare-opacity="0.28"
            :glare-angle="-35"
            :glare-duration="900"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* état initial */
.skill-hidden {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(3px);
}

/* état final */
.skill-show {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
  transition:
    opacity 520ms ease,
    transform 520ms ease,
    filter 520ms ease;
}
</style>
