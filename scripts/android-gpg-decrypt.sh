#!/bin/sh

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output ./android/app/upload-keystore.jks ./android/app/upload-keystore.jks.gpg

gpg --quiet --batch --yes --decrypt --passphrase="$ENCRYPT_PASSWORD" \
--output ./android/app/private-kit-sm-503f859360c2.json ./android/app/private-kit-sm-503f859360c2.json.gpg