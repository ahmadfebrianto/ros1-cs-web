#!/bin/bash

BUILD_DIR="build"
TARGET_DIR="$BUILD_DIR/linux"

TAB="    "

check_result() {
  if [ $? -ne 0 ]; then
    echo "[!] Build failed at this step."
    exit 1
  fi
}

create_output_dir() {
  echo "[+] Create output directory"
  if [ ! -d "$TARGET_DIR" ]; then
    echo "$TAB|--'$TARGET_DIR' directory doesn't exist!"
    echo "$TAB|--creating '$TARGET_DIR'"
    mkdir -p $TARGET_DIR
  else
    echo "$TAB|--'$TARGET_DIR' directory already exists!"
  fi

  OUTPUT_DIR="$TARGET_DIR/$(date +'%Y_%m_%d__%H_%M')"
  echo "$TAB|--creating '$OUTPUT_DIR'"
  mkdir -p "$OUTPUT_DIR"
  check_result
  echo "$TAB'--done!"
}

install_tauri_cli() {
  echo "[+] Install tauri-cli"
  echo "$TAB|--installing tauri-cli"
  npm i @tauri-apps/cli
  check_result
  echo "$TAB'--done!"
}

build_tauri_app() {
  echo "[+] Build tauri app"
  echo "$TAB|--building tauri app"
  npm run tauri build
  check_result
  echo "$TAB'--done!"
}

collect_output() {
  echo "[+] Collect output app"
  echo "$TAB|--collecting output apps"
  BUNDLE_DIR="./src-tauri/target/release/bundle"
  mv $BUNDLE_DIR/deb/*amd64.deb $OUTPUT_DIR
  mv $BUNDLE_DIR/appimage/*amd64.AppImage $OUTPUT_DIR
  check_result
  echo "$TAB'--output apps are stored in '$OUTPUT_DIR'"
  echo "$TAB'--done!"
}

# Steps
create_output_dir
install_tauri_cli
build_tauri_app
collect_output
