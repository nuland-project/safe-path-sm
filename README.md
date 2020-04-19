# Safe Path: Lemonade San Marino

This is forked version of official [covid-safe-path repository](https://github.com/tripleblindmarket/covid-safe-paths) and is intended to be customized, deployed to production and tested in San Marino Republic. We also encourage everyone to follow [their](http://privatekit.mit.edu/) workstream for the general coordination and support from communtiy dedicated to building next level privacy respectful tech and intergrating it worldwide for the benefit of humanity. We even have an [YouTube channel](https://www.youtube.com/channel/UCtHuIdXULeIfbDrGF6c9P2g).

Designing this software we want to follow guidelines and approach lined out in [EU document (v.1.0)](https://ec.europa.eu/health/sites/health/files/ehealth/docs/covid-19_apps_en.pdf). In essence it states that the technology has to be used to effectively coordinate efforts in our fight against viral threat, but we have to be very carefull designing it as we can sacrifice too much of our freedom without need to do so. It explains the essential requirements for national
apps, namely that they be:

- voluntary;
- approved by the national health authority;
- privacy-preserving - personal data is securely encrypted; and
- dismantled as soon as no longer needed.

The added value of these apps is that they can record contacts that a person may not notice or remember.

These requirements on how to record contacts and notify individuals are anchored in accepted epidemiological guidance, and reflect best practice on cybersecurity, and accessibility. They cover how to prevent the appearance of potentially harmful unapproved apps, success criteria and collectively monitoring the effectiveness of the apps, and the outline of a communications strategy to engage with stakeholders and the people affected by these initiatives.

## Design Rationale

We have to follow holistic approach to the healthcare system design, because the system of that size and importance requires public trust to opearate efficiently. And public trust can be gained only if one is able to convince authorities and society that there is no hiddent conflict of interest which will definetly ruin the trust at scale. Hence it has to be opensource solution, with a great support from community and built with security-first mindset. Below is one possible approach for such a system and relevant tech considerations based on advances in applied cryptography and distributed systems fields.

- The system will never have unencrypted access to the data they are storing and computing on. This is possible through homomorphic encryption technology, that allows computations to be performed directly on encrypted data. Data privacy relies on state-of-the-art cryptography (mathematics) and all information release will be controlled by the customer. More info on this topic can be found for example in [SEAL library documentation](https://github.com/Microsoft/SEAL#core-concepts).

  N.B.: Homomorphic encryption cannot be used to enable data scientist to circumvent GDPR. For example, there is no way for a cloud service to use homomorphic encryption to draw insights from encrypted customer data. Instead, results of encrypted computations remain encrypted and can only be decrypted by the owner of the data, e.g., a cloud service customer.

- To comply with GDPR policies (which we approve and find ethical) the best thing we can do is to encrypt everything by default, and then provide user with clear options how and which data he wants to disclose with the system and ask for hers explicit consent. The default operation mode should be anonymous and strongly encrypted (so we can statisfy dismantleability), but then we are free to provide user with granularity of control and incentives to share pieces of data consentually.

- Also we want to design the system which takes into consideration the possibility of surveliance state coming in control, luckily we have a solution described nicely by creators of a [GUN project](https://gun.eco/docs/Privacy-What-You-Need-To-Know) which is also good from environmental point of view. Fault-tolerance and PKI also comes along with the deployment of blockchain and [self-sovereign identity](https://www.w3.org/TR/vc-use-cases/) layers of [decentralized web](https://gun.eco/docs/dWeb-The-Decentralized-Web).

- The other issue is abuse of the system by dishonest users, and it can be addressed with the use of public reputation system assisted by privacy preserving AI, p2p verification and real-time monitoring. Also introduction of economic incentives allows us initiate interactive verification games in order to invlove community into counter-cheating activities.

## Project Setup

1. Integrate mobile applications with Firebase backend and Cloud Storage

- [x] - Setup private-kit-sm Firebase project
- [x] - iOs app connected to Firebase
- [x] - Android app connected to Firebase
- [x] - Implement Export to Cloud Storage (private domain)
- [x] - Move public dataset to Cloud Storage (public domain)
- [x] - Review public dataset update logic and aggregation process
- [x] - Review cryptography used and infered privacy guarantees

1. Setup CI\CD pipeline and publish apps to app stores

- [x] - Deploy app to Google Play Store (Private Kit: San Marino)
- [ ] - Deploy app to Apple Store (Private Kit: San Marino)
- [x] - Github Actions workflow for CD for Android app
- [ ] - Github Actions workflow for CD for iOs app

1. Updates to frontend application and UX design

- [x] - Discuss idea of responsible signaling (the idea is to let people signal that they suspect infection and mark themselves for authorities and neighbours?)
- [ ] - Elaborated user story (including government part)
- [ ] - Review import feature for iOs and Android devices
- [x] - Develop wireframes in Figma for UX/UI designs
- [ ] - Implement UI required to get user consent and export data

## Initial phase (2-4 weeks)

### Privacy track

- [ ] - Implement keys management and on-device encryption ( PKI infrastructure )
- [ ] - Implement geolocation snapshot collection logic ( geohashes + e2e-encryption )
- [ ] - Granular control over spatial resolution (using HD-keys for disclosing parts of the geohash prefix)
- [ ] - Research on [fully homomorphic encryption](https://homomorphicencryption.org/introduction/) (FHE) schemes applicable to spatial matching, benchmarking open source libraries (e.g. )
- [ ] - Privacy preserving matching implementation using selected FHE scheme and bloom filters (instead of disclosing infected person tracks to general public)

### SM Health Authority (HA) track

- [ ] - Manual collection of data of most recently infected persons with Safe Places web app
- [ ] - Scoping of health authority point of view and administrative webapp requirements (e.g. heatmap, social distancing score)
- [ ] - Cloud infrastructure setup and blockchain for data collection and management
- [ ] - Develop API compatible with Safe Path and Safe Places
- [ ] - Push-notification and UX for mobile apps (daily updates on new cases)
- [ ] - Review security and access rights, GDPR complience check

### Social & joint effort track

- [ ] - Web site + call center for voluntiers and citizens (lemonade.one)
- [ ] - Chatbot for prescreening (feeds data into HA backend)
- [ ] - Community management and support through whatsup and social media
- [ ] - Interoperability research for HAs and apps being deployed in the world (next update from EU on the 8th of April)

## Integration with Nuland ecosystem

We think we can integrate this technology into our social network app, this will allow us to directly incetivise people and reward them for being responsible self-isolators as well as for donating their data to public domain.

# Original Initiative: Private Kit

WhatsApp: https://chat.whatsapp.com/HXonYGVeAwQIKxO0HYlxYL
Slack: https://safepathsprivatekit.slack.com/

Help us stop COVID-19.

We’re building the next generation of secure location logging to preserve privacy and #flattenthecurve

Location logs provide time-stamped records of where users have been, allowing them to share information with health officials accurately and quickly. This helps support contact tracing efforts to slow the spread of the virus.

What’s truly special about Private Kit, though, is its privacy protection. Data never leaves users’ devices without their password entry and explicit consent. The location log generated by Private Kit cannot be accessed from outside the user’s device, meaning data transfer occurs only if the user chooses to share it with the researcher.

---

<img align="right" src="./assets/PreviewUI.png" data-canonical-src="./assets/PreviewUI.png"/>

Private Kit is a ‘privacy-first’ app that allows you to log your GPS trails on your own phone. The information is stored locally and never shared with anyone (not even with us or MIT) until you explicitly decide to manually export the data. The location log generated by Private Kit cannot be accessed from outside the user’s device. Location information can be imported and exported by the user and used in other projects and applications.

Private Kit’s trail generator logs your device’s location once every five minutes and stores 28 days of data in under 100KB of space – less space than a single picture. But what is truly exciting about Private Kit is its privacy protection.

**Home page:** http://privatekit.mit.edu

**WhitePaper:** [Apps Gone Rogue: Maintaining Personal Privacy in an Epidemic](https://drive.google.com/file/d/1nwOR4drE3YdkCkyy_HBd6giQPPhLEkRc/view?usp=sharing)

**Downloads:** [Google Play](https://play.google.com/store/apps/details?id=edu.mit.privatekit) | [Apple Store](https://apps.apple.com/us/app/private-kit-prototype/id1501903733)
