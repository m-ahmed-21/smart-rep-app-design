# SmartRep: Your Smart Gym Companion 🚀

SmartRep is a front-end web design for a mobile application that provides a sensor-based rep-feedback system for GYM weightlifting machines. It focuses on real-time rep tracking, range-of-motion visualization, and gym equipment reservation.

This project serves as a Proof of Concept (PoC) for the SmartRep mobile application, demonstrating a modern, technological, and user-friendly interface.

## 🌟 Project Overview

SmartRep aims to enhance the gym experience by providing users with detailed insights into their workouts. It leverages Bluetooth connectivity to track reps, visualize range of motion, and manage equipment availability, creating a smarter and more efficient training environment.

## 🚀 Key Features

*   **Real-time Rep Tracking**: Accurately counts repetitions as you exercise.
*   **Range of Motion (ROM) Visualization**: Provides visual feedback on your movement range during each rep.
*   **Bluetooth Sensor Integration**: Connects wirelessly to gym equipment sensors for data collection.
*   **Machine Reservation System**: Allows users to find and reserve available gym machines.
*   **Personalized Calibration**: Calibrates sensor data to individual user movements for accurate feedback.
*   **Workout Summary**: Offers a detailed overview of completed sets, reps, quality, and trends.
*   **User Profile & Progress Tracking**: Stores user data and displays progress over time.
*   **Modern UI/UX**: Designed with a clean, intuitive, and visually appealing interface.

## 🛠️ Tech Stack

*   **Framework**: Next.js, React
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **State Management**: TanStack Query
*   **UI Components**: Radix UI, Shadcn/ui
*   **Routing**: TanStack Router
*   **Build Tool**: Vite
*   **Icons**: Lucide React

## 🚀 Installation

Follow these steps to set up the project locally:

1.  **Clone the repository**:
    ```sh
    git clone https://github.com/m-ahmed-21/smart-rep-app-design
    cd smart-rep-app-design
    ```

2.  **Install dependencies**:
    Make sure you have Node.js installed. It is recommended to use `nvm` for managing Node.js versions.
    ```sh
    npm i
    ```

3.  **Run the development server**:
    ```sh
    npm run dev
    ```

This will start the development server, and you can access the application in your browser, typically at `http://localhost:5173` (or the port specified by Vite).

## 💡 Usage

This project is a front-end design (Proof of Concept) for the SmartRep mobile application. It simulates the user interface and interaction flow.

**Key User Flows:**

1.  **Machine Discovery**: The app scans for nearby compatible gym machines via Bluetooth.
2.  **Machine Selection**: Users can view machine status (Free, Occupied, Open for Alt.) and select a machine.
3.  **Connection & Calibration**: Establishes a Bluetooth connection with the selected machine's sensor and guides the user through a quick calibration process to personalize rep detection.
4.  **Workout Tracking**: Once calibrated, the app tracks reps in real-time, providing feedback on rep quality, range of motion, and speed.
5.  **Rest Timer**: Automatically manages rest periods between sets.
6.  **Session Summary**: After the workout, a summary screen displays key performance metrics.
7.  **Profile Management**: Users can view their workout history, progress, and personal baselines.

**Example:**

*   **Connecting to a Machine**:
    ```typescript
    // Simulate selecting a machine and initiating connection
    const handleMachineSelect = (machine) => {
      // Logic to navigate to connecting screen and establish Bluetooth connection
      console.log(`Connecting to ${machine.name} (${machine.id})...`);
    };
    ```

*   **Tracking a Rep**:
    The `TrackingScreen` component visually represents real-time rep data, including:
    *   Current rep count.
    *   Set progress.
    *   Range of Motion (ROM) bar.
    *   Rep speed gauge.
    *   Form alerts for potential issues.

## 📁 Project Structure

The project follows a standard Next.js/TanStack Router structure with organized component and utility directories:

```
smart-rep-app-design/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── s-smartrep.svg
│   │   └── weightlifting_machine_flaticons/
│   ├── components/
│   │   ├── smartrep-app.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── lovable-error-reporting.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   └── README.md
│   ├── server.ts
│   ├── router.tsx
│   ├── start.ts
│   └── styles.css
├── .env
├── .eslintignore
├── .eslintrc.cjs
├── .eslintrc.js
├── .gitignore
├── .lovable/
│   ├── plan/
│   └── project.json
├── .prettierignore
├── .prettierrc
├── .vscode/
│   └── settings.json
├── AGENTS.md
├── bun.lock
├── bunfig.toml
├── capture_screens.mjs
├── components.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📚 Documentation

*   **TanStack Router Documentation**: [https://tanstack.com/router/latest/docs/overview](https://tanstack.com/router/latest/docs/overview)
*   **Shadcn/ui Documentation**: [https://ui.shadcn.com/](https://ui.shadcn.com/)
*   **Lovable Documentation**: [https://lovable.dev/docs](https://lovable.dev/docs)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature (`git checkout -b feature/AmazingFeature`).
3.  **Commit your changes** (`git commit -m 'Add some AmazingFeature'`).
4.  **Push to the branch** (`git push origin feature/AmazingFeature`).
5.  **Open a Pull Request**.

## 📜 License

This project does not have a license specified. Please refer to the GitHub repository for more details.

## 🔗 Important Links

*   **Live App**: [https://smart-rep-vista.lovable.app](https://smart-rep-vista.lovable.app)
*   **Lovable Editor**: [https://lovable.dev/projects/6eb3f04b-730b-4df9-8db8-fad70cab99a6](https://lovable.dev/projects/6eb3f04b-730b-4df9-8db8-fad70cab99a6)

## 📝 Footer

© 2023 SmartRep. All rights reserved.

[smart-rep-app-design](https://github.com/m-ahmed-21/smart-rep-app-design)

Made with ❤️ by m-ahmed-21

[![GitHub Repo stars](https://img.shields.io/github/stars/m-ahmed-21/smart-rep-app-design?style=social)](https://github.com/m-ahmed-21/smart-rep-app-design/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/m-ahmed-21/smart-rep-app-design?style=social)](https://github.com/m-ahmed-21/smart-rep-app-design/forks)

[Report issues](https://github.com/m-ahmed-21/smart-rep-app-design/issues)


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
