#!/usr/bin/env bash
set -e

# Spinner de puntos
dot_spinner() {
  local pid=$1
  local action=$2
  local i=0
  local dots=("." ".." "...")

  while ps -p $pid &>/dev/null; do
    printf "\r%s %s" "$action" "${dots[i]}"
    i=$(( (i + 1) % 3 ))
    sleep 0.5
  done
  printf "\r%s ... ✅\n" "$action"
}

# Limpiar carpetas
(
  rm -rf node_modules .next .swc
) &
dot_spinner $! "Limpiando carpetas"

# Instalar dependencias (logs silenciosos)
(
  yarn install 1>/dev/null
) &
dot_spinner $! "Instalando dependencias"

echo "Todo listo! ✅"
