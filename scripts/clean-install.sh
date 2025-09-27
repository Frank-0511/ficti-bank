#!/usr/bin/env zsh

spinner() {
  local pid=$1
  local message=$2
  local spin=(⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏)
  local i=0
  while kill -0 $pid 2>/dev/null; do
    printf "\r⏳ %s %s" "${spin[i]}" "$message"
    ((i=(i+1)%${#spin[@]}))
    sleep 0.1
  done
  printf "\r"
}

run_step() {
  local description=$1
  shift
  local cmd=("$@")

  # Ejecutar comando en background
  "${cmd[@]}" > >(cat) 2>&1 &
  local pid=$!

  # Mostrar spinner mientras corre
  spinner $pid "$description"

  wait $pid
  local exit_code=$?

  if [ $exit_code -eq 0 ]; then
    echo "✅ $description completado"
  else
    echo "❌ $description falló (ver errores arriba)"
  fi
  echo
}

# ============================
# Comenzar limpieza e instalación
# ============================

run_step "Limpiando carpetas" rm -rf node_modules .next .swc || true
run_step "Instalando dependencias" pnpm install --silent
