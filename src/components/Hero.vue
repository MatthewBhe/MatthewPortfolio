<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Aurora from './ui/Aurora.vue'
import VariableProximity from './ui/VariableProximity.vue'

const { t } = useI18n()
const heroRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section
    ref="heroRef"
    data-hero
    class="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
  >
    <!-- 🔵 BACKGROUND AURORA -->
    <div class="pointer-events-none absolute inset-0 -z-10">
      <Aurora
        :color-stops="['#4C2FBF', '#9B5CFF', '#4C2FBF']"
        :amplitude="1.0"
        :blend="0.5"
        :speed="1.0"
        :intensity="1.0"
        class="w-full h-full"
      />
      <div class="absolute inset-0 bg-[#101820]/40"></div>
    </div>

    <div class="container relative z-10">
      <div class="max-w-4xl mx-auto space-y-8">

        <div
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="0"
          class="text-6xl sm:text-8xl font-black leading-[1.05]"
        >
          <VariableProximity
            class-name="inline-block align-baseline"
            label="MATTHEW"
            from-font-variation-settings="'wght' 420, 'opsz' 16"
            to-font-variation-settings="'wght' 900, 'opsz' 48"
            :radius="150"
            falloff="gaussian"
            :style-obj="{ letterSpacing: '-0.02em' }"
          />
          <span class="inline-block w-3 sm:w-4"></span>
          <VariableProximity
            class-name="inline-block align-baseline text-brand-accent glow-text"
            label="BONHOMME"
            from-font-variation-settings="'wght' 500, 'opsz' 18"
            to-font-variation-settings="'wght' 1000, 'opsz' 52"
            :radius="170"
            falloff="gaussian"
            :style-obj="{ letterSpacing: '-0.02em' }"
          />
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="900"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="160"
        >
          <VariableProximity
            class-name="block text-white/80 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto"
            :label="t('hero.subtitle')"
            from-font-variation-settings="'wght' 350, 'opsz' 14"
            to-font-variation-settings="'wght' 700, 'opsz' 28"
            :radius="120"
            falloff="exponential"
          />
        </div>


        <div
          class="flex flex-wrap gap-4 justify-center"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-easing="ease-out-cubic"
          data-aos-delay="320"
        >
          <a
            href="https://github.com/MatthewBhe"
            target="_blank"
            class="btn btn--primary px-8 py-4 text-lg"
            data-aos="fade-up"
            data-aos-delay="360"
          >
            {{ t('hero.github') }}
          </a>

          <a
            href="https://www.linkedin.com/in/matthew-bonhomme-302a35215/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn--ghost px-8 py-4 text-lg inline-flex items-center gap-2"
            :aria-label="t('hero.linkedinAria')"
            data-aos="fade-up"
            data-aos-delay="460"
          >
            {{ t('hero.linkedin') }}
          </a>
        </div>
      </div>
    </div>

    <!-- vignette mask -->
    <div
      class="pointer-events-none absolute inset-0
             [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
    ></div>
  </section>
</template>
