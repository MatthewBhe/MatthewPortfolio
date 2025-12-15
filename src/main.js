import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { i18n } from './i18n'

const app = createApp(App)

app.use(i18n)           
app.mount('#app')       

AOS.init({
  duration: 500,
  easing: 'ease-out',
  once: true,
  mirror: true
})

// ---- Enhanced scroll reveal & mouse glow ----
function initEnhancements() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('show')
        io.unobserve(e.target)
      }
    }
  }, { threshold: 0.12 })

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    el.classList.add('reveal')
    io.observe(el)
  })

  let ticking = false
  function onMove(evt) {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      document.body.style.setProperty('--mx', evt.clientX + 'px')
      document.body.style.setProperty('--my', evt.clientY + 'px')
      ticking = false
    })
  }
  window.addEventListener('mousemove', onMove, { passive: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancements)
} else {
  initEnhancements()
}
