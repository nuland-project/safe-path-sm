# Nuland Team Vision:

## Intro

What we want to do and why.

## Project Setup

1. Integrate mobile applications with Firebase backend and Cloud Storage

- [x] - Setup private-kit-sm Firebase project
- [x] - iOs app connected to Firebase
- [x] - Android app connected to Firebase
- [x] - Implement Export to Cloud Storage (private domain)
- [ ] - Move public dataset to Cloud Storage (public domain)

1. Setup CI\CD pipeline and publish apps to app stores

- [ ] - Deploy app to Google Play Store (Private Kit: San Marino)
- [ ] - Deploy app to Apple Store (Private Kit: San Marino)
- [ ] - Github Actions workflow for CD for Android app
- [ ] - Github Actions workflow for CD for iOs app

1. Updates to frontend application and UX design

- [ ] - Discuss idea of responsible signaling (the idea is to let people signal that they suspect infection and mark themselves for authorities and neighbours?)
- [ ] - Elaborated user story (including government part)
- [ ] - Review import feature for iOs and Android devices
- [ ] - Implement UI required to get user consent and export data

## Project Take-off

1. Backend logic (on Google Cloud Platform)

- [ ] - Review public dataset update logic and aggregation process
- [ ] - Setup cloud infrastructure to trigger update (python scripts probably?) to public dataset
- [ ] - Push-notification for mobile apps (daily updates on new cases)
- [ ] - Review cryptography used and infered privacy guarantees
- [ ] - Review security and access rights, GDPR complience check

1. UX design and frontend app

- [ ] - Develop wireframes in Figma and finalize UX/UI
- [ ] - Implement and test offline usage scenarios
- [ ] - Implement missing screens and UI elements

## Integration with Nuland ecosystem

We think we can integrate this technology into our social network app, this will allow us to directly incetivise people and reward them for being responsible self-isolators as well as for donating their data to public domain.
