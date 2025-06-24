3d-insight-layer/
├── public/                      # Статические ресурсы (favicon, шрифты, etc.)
│   └── index.html
├── src/
│   ├── assets/                  # Статичные ресурсы (изображения, модели, gltf, glsl)
│   │   ├── shaders/
│   │   ├── textures/
│   │   └── models/
│
│   ├── core/                    # Инициализация Three.js, сцены, камеры, рендерера
│   │   ├── SceneManager.js
│   │   ├── Renderer.js
│   │   ├── Camera.js
│   │   └── Controls.js
│
│   ├── components/             # UI-компоненты React
│   │   ├── App.jsx
│   │   ├── Sidebar.jsx
│   │   └── Loader.jsx
│
│   ├── scenes/                 # Логика визуализации/сцен
│   │   ├── InsightScene.js
│   │   └── utils/
│   │       └── createParticles.js
│
│   ├── workers/                # Web Workers
│   │   ├── dataProcessor.js
│   │   └── particlePhysics.js
│
│   ├── data/                   # Моки, генерация и структура данных
│   │   ├── mockGenerator.js
│   │   └── schema.js
│
│   ├── ui/                     # GSAP-анимации и взаимодействие
│   │   ├── transitions.js
│   │   └── modes.js
│
│   ├── utils/                  # Общие утилиты
│   │   ├── objectPool.js
│   │   └── performanceMonitor.js
│
│   ├── styles/                 # CSS/SCSS стили
│   │   └── main.css
│
│   ├── main.jsx                # Точка входа в приложение
│   └── config.js               # Конфигурация (LOD, limits, и т.п.)
│
├── .eslintignore
├── .eslintrc.js (или eslint.config.js)
├── vite.config.js
├── package.json
└── README.md
