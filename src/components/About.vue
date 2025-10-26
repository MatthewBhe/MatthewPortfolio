<script setup lang="ts">
import ElectricBorder from './ui/ElectricBorder.vue'
</script>

<template>
  <section id="a-propos" class="section py-20">
    <div class="container mx-auto grid md:grid-cols-2 gap-16 items-center">
      <!-- Colonne texte -->
      <div class="space-y-6" data-reveal>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          À propos de moi
        </h2>

        <div class="space-y-4 text-white/80 leading-relaxed">
          <p>
            Je m'appelle <span class="text-brand-accent font-semibold">Matthew Bonhomme</span>, développeur passionné dans le web et le mobile. Curieux et déterminé, j’attache une grande importance à la qualité du code et à l’expérience utilisateur.
          </p>
          <p>
            Fort de plusieurs projets réalisés en <span class="text-brand-accent">Java</span>, <span class="text-brand-accent">Vue.js</span> et <span class="text-brand-accent">Android</span>, je développe des solutions modernes, performantes et sur mesure.
          </p>
          <p>
            Mon objectif : allier <span class="italic">créativité</span> et <span class="italic">rigueur technique</span> pour concevoir des interfaces élégantes et intuitives.
          </p>
          <p>
            Toujours avide d’apprendre, j’évolue dans un environnement où l’innovation et la collaboration sont au cœur de ma démarche.
          </p>
        </div>
      </div>

      <ElectricBorder
        :color="'#9b5cff'"
        :speed="1"
        :chaos="0.5"
        :thickness="2"
        :style="{ borderRadius: '16px' }"
        className="w-full"
        data-reveal
      >
        <div
          class="p-8 rounded-2xl bg-gradient-to-b from-[#141a24]/90 to-[#0d1219]/90 shadow-2xl relative overflow-hidden backdrop-blur"
        >
          <!-- Effet shimmer -->
          <div
            class="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_linear_infinite]"
            style="background-size:200% 100%"
          ></div>

          <!-- Contenu -->
          <div class="relative grid grid-cols-3 gap-6 text-center">
            <div class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div class="text-2xl font-black text-brand-accent">Web</div>
              <div class="text-sm text-white/60 mt-1">Vue / Nuxt / Node</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div class="text-2xl font-black text-brand-accent">Mobile</div>
              <div class="text-sm text-white/60 mt-1">Android / Java</div>
            </div>
            <div class="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div class="text-2xl font-black text-brand-accent">Qualité</div>
              <div class="text-sm text-white/60 mt-1">UX / Performance</div>
            </div>
          </div>

          <!-- Citation -->
          <div class="relative mt-8 text-center">
            <p class="text-white/70 text-sm mb-6">
              “Créer des expériences numériques qui inspirent et fonctionnent parfaitement.”
            </p>

            <!-- Bouton Voir mon CV -->
            <a
              href="/assets/cv-matthew-bonhomme.pdf"
              target="_blank"
              class="inline-block btn--primary btn--glare"
            >
              Voir mon CV
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

/* Style bouton primaire */
.btn--primary {
  @apply bg-brand-accent text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition hover:opacity-90 hover:scale-105 active:scale-95;
}

/* Petit effet de brillance si tu veux garder “btn--glare” */
.btn--glare {
  position: relative;
  overflow: hidden;
}
.btn--glare::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: all 0.8s ease;
}
.btn--glare:hover::before {
  left: 100%;
}
</style>
