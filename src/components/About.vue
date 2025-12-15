<script setup lang="ts">
import ElectricBorder from './ui/ElectricBorder.vue'
import { useI18n } from 'vue-i18n'
import { onMounted, onBeforeUnmount } from 'vue'
// @ts-ignore
import AOS from 'aos'

const { t } = useI18n()

const cards = [
  { key: 'web', delay: 0 },
  { key: 'mobile', delay: 100 },
  { key: 'quality', delay: 200 }
] as const

function refreshAOS() {
  // petit délai -> laisse le DOM se poser (fonts/layout/etc.)
  requestAnimationFrame(() => {
    AOS.refreshHard?.()
    AOS.refresh?.()
  })
}

function onResize() {
  refreshAOS()
}

onMounted(() => {
  refreshAOS()
  window.addEventListener('resize', onResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>


<template>
  <section id="a-propos" class="section py-16 sm:py-20">
    <div class="container mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <!-- Colonne texte -->
      <div class="space-y-6" data-aos="fade-up" data-aos-delay="0">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {{ t('about.title') }}
        </h2>

        <div class="space-y-4 text-white/80 leading-relaxed">
          <p data-aos="fade-up" data-aos-delay="100" v-html="t('about.p1')"></p>
          <p data-aos="fade-up" data-aos-delay="200" v-html="t('about.p2')"></p>
          <p data-aos="fade-up" data-aos-delay="300" v-html="t('about.p3')"></p>
          <p data-aos="fade-up" data-aos-delay="400" v-html="t('about.p4')"></p>
        </div>
      </div>

      <!-- Carte / badges -->
      <ElectricBorder
        :color="'#9b5cff'"
        :speed="1"
        :chaos="0.5"
        :thickness="2"
        :style="{ borderRadius: '16px' }"
        className="block w-full"
        data-aos="zoom-in-up"
        data-aos-delay="150"
      >
        <div
          class="relative rounded-2xl bg-gradient-to-b from-[#141a24]/90 to-[#0d1219]/90 shadow-2xl overflow-hidden backdrop-blur p-6 sm:p-8"
        >
          <div
            class="pointer-events-none absolute -inset-1 sm:block hidden bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_linear_infinite]"
            style="background-size:200% 100%"
          ></div>

          <div class="relative grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div
              v-for="(c, i) in cards"
              :key="c.key"
              class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition"
              data-aos="fade-up"
              :data-aos-delay="c.delay"
            >
              <div class="text-lg sm:text-2xl font-black text-brand-accent">
                {{ t(`about.cards.${c.key}.title`) }}
              </div>
              <div class="text-xs sm:text-sm text-white/60 mt-1">
                {{ t(`about.cards.${c.key}.subtitle`) }}
              </div>
            </div>
          </div>

          <div class="relative mt-6 sm:mt-8 text-center">
            <p class="text-white/70 text-sm sm:text-base mb-4 sm:mb-6" data-aos="fade-up" data-aos-delay="250">
              {{ t('about.quote') }}
            </p>

            <a
              href="/assets/cv-matthew-bonhomme.pdf"
              target="_blank"
              class="inline-block w-full sm:w-auto btn--primary btn--glare"
              data-aos="fade-up" data-aos-delay="350"
            >
              {{ t('about.cv') }}
            </a>
          </div>
        </div>
      </ElectricBorder>
    </div>
  </section>
</template>

<style scoped>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.btn--primary { @apply bg-brand-accent text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition hover:opacity-90 hover:scale-105 active:scale-95; }
.btn--glare { position: relative; overflow: hidden; }
.btn--glare::before {
  content:""; position:absolute; top:0; left:-100%; width:200%; height:100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: all .8s ease;
}
.btn--glare:hover::before { left:100%; }
</style>
