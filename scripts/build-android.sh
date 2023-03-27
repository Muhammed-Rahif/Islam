#!/bin/bash
node scripts/versioning.js -v $1
npx cap sync android
ionic capacitor update
ionic capacitor copy android
cd android
chmod +x gradlew
./gradlew assembleDebug
./gradlew assembleRelease
cd ..
