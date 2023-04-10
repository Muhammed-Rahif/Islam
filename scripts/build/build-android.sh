#!/bin/bash
node scripts/build/versioning.js -v $1
yarn build
npx cap sync android
ionic capacitor update
ionic capacitor copy android
cd android
chmod +x gradlew
./gradlew assembleDebug
./gradlew assembleRelease
echo "$KEYSTORE_FILE_BASE64" | base64 --decode > release-key.keystore
$ANDROID_HOME/build-tools/30.0.3/zipalign -v 4 app/build/outputs/apk/release/app-release-unsigned.apk app/build/outputs/apk/release/app-release.apk
$ANDROID_HOME/build-tools/30.0.3/apksigner sign --ks release-key.keystore --ks-key-alias $KEYSTORE_ALIAS --ks-pass pass:$KEYSTORE_PASS app/build/outputs/apk/release/app-release.apk 
cd ../
