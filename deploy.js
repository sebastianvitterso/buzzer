//https://stackoverflow.com/a/45082999/11192976
import { execSync } from 'node:child_process'

console.log('\nBUILDING BUZZER-APP\n')
execSync('npm run build', { stdio: 'inherit' })
console.log('\nDEPLOYING TO BUZZER-APP\n')
execSync('firebase deploy --only hosting:buzzer-vitterso', { stdio: 'inherit' })
console.log('\nBUILD AND DEPLOY TO BUZZER.VITTERSO.NET COMPLETE\n')
