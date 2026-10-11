My name is Munyaneza Ngabo.

# MNPortfolio

A standalone personal portfolio Android application built with React Native, Expo and TypeScript.

## Student information

- **Full name:** Munyaneza Ngabo
- **Registration number:** 25/27861
- **Verification code:** MOB-A2-7861
- **App name:** MNPortfolio
- **Version:** 1.0.0

## Purpose

MNPortfolio is an offline-first personal portfolio app built as part of the Mobile Application Development (SWE 3409) individual assignment. It introduces the student to a recruiter in under two minutes, works without an internet connection, and demonstrates practical React Native, TypeScript, navigation, persistence and camera/gallery skills.

## Features

- Home screen with the exact "My name is Munyaneza Ngabo." statement, profile image, professional headline, short biography and verification code.
- Skills screen with five genuine skills and an education / training timeline, built from reusable components.
- Projects screen with two genuine student projects and a separate stack-routed detail screen showing problem, contribution, technology and summary.
- Profile editor with controlled inputs, three validation rules and field-level error messages.
- Bottom-tab navigation (Home, Skills, Projects, Editor, About) plus a stack route for Project Details. Android back navigation preserves the current session.
- Camera and gallery workflow with permission handling, preview, replace and remove actions.
- Local persistence with AsyncStorage: editable profile data and selected image reference survive app restarts.
- Full offline support: all core features work in Airplane Mode. Only the optional GitHub link requires a connection, and it is clearly labelled.
- About screen with app name, student name, registration number, verification code, version and a data-use statement.
- Standalone Android release via EAS Build (APK installs and launches without Expo Go).

## Tech stack

- React Native (Expo SDK 57)
- TypeScript
- React Navigation (bottom tabs + native stack)
- AsyncStorage
- expo-image-picker
- EAS Build

## Setup and run

```bash
git clone https://github.com/Ngabo-Peacemaker1/MOB_A2_2527861.git
cd MOB_A2_2527861
npm install
npx expo start
    ## More

    - **apk link https://github.com/Ngabo-Peacemaker1/MOB_A2_2527861/releases/download/v1.0.0/MOB_A2_2527861.apk
    - **video DEMO link https://github.com/Ngabo-Peacemaker1/MOB_A2_2527861/releases/download/v1.0.0/MOB_A2_2527861_DEMO.mp4
    - **Final commit hash:** 5102b0d5ae564dc9124a45c44f0def6b78155310