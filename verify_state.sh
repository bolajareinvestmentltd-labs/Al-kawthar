echo "--- Al-Kawthar State Audit ---"

files=(
  "src/store/useAudioStore.ts"
  "src/components/AudioPlayer/AudioEngine.tsx"
  "src/components/AudioPlayer/AudioProvider.tsx"
  "src/components/Navigation/FloatingNav.tsx"
  "src/app/layout.tsx"
  "public/sw.js"
  "src/components/Settings/TypographySettings.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "[FOUND] $file"
  else
    echo "[MISSING] $file"
  fi
done
