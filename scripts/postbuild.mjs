import { copyFileSync, writeFileSync } from 'fs'
try {
  copyFileSync('dist/index.html', 'dist/404.html') 
  writeFileSync('dist/.nojekyll', '')              
} catch (e) {
  process.exit(1)
}
