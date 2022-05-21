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

create_dist_dir() {
  echo "[+] Create dist directory"
  DIST_DIR="$OUTPUT_DIR/dist"
  echo "$TAB|--creating '$DIST_DIR'"
  mkdir -p "$DIST_DIR"
  check_result
  echo "$TAB'--done!"
}

copy_source_code() {
  echo "[+] Copy source code to output directory"
  TAURI_CONF="tauri.myconf.json"
  echo "$TAB|--copying '$TAURI_CONF' to '$OUTPUT_DIR'"
  cp $TAURI_CONF $OUTPUT_DIR
  FILES=$(ls -A | grep -Ev "tauri|build|^\.|^R")
  cp -r $FILES $DIST_DIR
  check_result
  for file in $FILES; do
    echo "$TAB|--copying '$file' to '$DIST_DIR'"
  done
  echo "$TAB'--done!"
}

change_directory() {
  echo "[+] Change directory to output directory"
  cd $OUTPUT_DIR
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

initialize_tauri_app() {
  echo "[+] Initialize tauri app"
  echo "$TAB|--initializing tauri app"
  app_name="SLAM AGV"
  window_title="Stechoq AGV by SLAM"
  dist_dir="../dist"
  dev_path="../dist"
  ./node_modules/.bin/tauri init --force \
    --app-name "$app_name" \
    --window-title "$window_title" \
    --dist-dir $dist_dir \
    --dev-path $dev_path
  check_result
  echo "$TAB'--done!"
}

build_tauri_app() {
  echo "[+] Build tauri app"
  echo "$TAB|--building tauri app"
  ./node_modules/.bin/tauri build -c $TAURI_CONF
  check_result
  echo "$TAB'--done!"
}

collect_output() {
  echo "[+] Collect output app"
  echo "$TAB|--collecting output app"
  BUNDLE_DIR="./src-tauri/target/release/bundle"
  cp $BUNDLE_DIR/deb/*amd64.deb .
  cp $BUNDLE_DIR/appimage/*amd64.AppImage .
  check_result
  echo "$TAB'--done!"
}

remove_junk() {
  echo "[+] Remove other files"
  echo "$TAB|--removing other files"
  rm -rf $(ls -A | grep -Ev "deb|AppImage")
  check_result
  echo "$TAB'--done!"
}

# Steps
create_output_dir
create_dist_dir
copy_source_code
change_directory
install_tauri_cli
initialize_tauri_app
build_tauri_app
collect_output
remove_junk
