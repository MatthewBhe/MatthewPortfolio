<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const open = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 10
}

function setLang(l: 'fr' | 'en') {
  locale.value = l
  localStorage.setItem('lang', l)
}

onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-500',
      scrolled ? 'backdrop-blur-md bg-black/40 border-b border-white/10' : ''
    ]"
  >
    <nav class="container flex items-center justify-between h-16">
      <a href="#" class="group inline-flex items-center gap-3">
        <span class="h-8 w-8 rounded-xl bg-brand-accent text-brand-dark grid place-content-center font-black">
          MB
        </span>
        <span class="font-semibold tracking-wide">{{ t('nav.name') }}</span>
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <ul class="flex gap-6 text-sm">
          <li><a href="#competences" class="hover:text-brand-accent">{{ t('nav.skills') }}</a></li>
          <li><a href="#projets" class="hover:text-brand-accent">{{ t('nav.projects') }}</a></li>
          <li><a href="#a-propos" class="hover:text-brand-accent">{{ t('nav.about') }}</a></li>
        </ul>

        <!-- Language switch (desktop) -->
        <div class="flex items-center gap-2 text-xs">
          <button
            @click="setLang('fr')"
            class="font-semibold transition"
            :class="locale === 'fr' ? 'text-brand-accent' : 'text-white/60 hover:text-white'"
            :aria-label="t('nav.langFrAria')"
          >
            FR
          </button>
          <span class="text-white/30">|</span>
          <button
            @click="setLang('en')"
            class="font-semibold transition"
            :class="locale === 'en' ? 'text-brand-accent' : 'text-white/60 hover:text-white'"
            :aria-label="t('nav.langEnAria')"
          >
            EN
          </button>
        </div>
      </div>

      <!-- Mobile button -->
      <button
        class="md:hidden btn btn--ghost px-3 py-2"
        @click="open = !open"
        :aria-label="t('nav.menuOpen')"
      >
        <span v-if="!open">{{ t('nav.menu') }}</span>
        <span v-else>{{ t('nav.close') }}</span>
      </button>
    </nav>

    <!-- Mobile menu -->
    <transition name="slide-fade">
      <div v-if="open" class="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div class="container py-4 flex flex-col gap-4">
          <a href="#competences" class="hover:text-brand-accent" @click="open = false">{{ t('nav.skills') }}</a>
          <a href="#projets" class="hover:text-brand-accent" @click="open = false">{{ t('nav.projects') }}</a>
          <a href="#a-propos" class="hover:text-brand-accent" @click="open = false">{{ t('nav.about') }}</a>

          <!-- Language switch (mobile) -->
          <div class="flex items-center gap-4 pt-3 border-t border-white/10">
            <button
              @click="setLang('fr'); open = false"
              class="font-semibold transition"
              :class="locale === 'fr' ? 'text-brand-accent' : 'text-white/70 hover:text-white'"
              :aria-label="t('nav.langFrAria')"
            >
              FR
            </button>
            <button
              @click="setLang('en'); open = false"
              class="font-semibold transition"
              :class="locale === 'en' ? 'text-brand-accent' : 'text-white/70 hover:text-white'"
              :aria-label="t('nav.langEnAria')"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
