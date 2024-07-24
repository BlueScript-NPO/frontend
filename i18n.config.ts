export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",

  messages: {
    en: {
      landing: {
        title: "BlueScript",
        cta: "Start Training",
        description:
          "BlueScript is a non-profit organization that develops free and open-source tools to help dyslexic individuals.",
        features: {
          title: "Why Choose BlueScript?",
          description:
            "BlueScript is a non-profit organization dedicated to developing free and open-source tools that support individuals with dyslexia.",
          headline: "Key Features",
          items: {
            card1: {
              title: "User-Friendly",
              description:
                "BlueScript is intuitively designed for home use, enabling individuals with dyslexia to benefit without needing professional assistance.",
            },
            card2: {
              title: "Always Free",
              description:
                "Committed to accessibility, BlueScript ensures that everyone has free access to essential dyslexia support tools.",
            },
            card3: {
              title: "Open Source",
              description:
                "BlueScript welcomes contributions from everyone. Access our source code to modify, enhance, and innovate freely.",
            },
            card4: {
              title: "Privacy First",
              description:
                "BlueScript prioritizes your privacy by not collecting any personal information, upholding your fundamental right to privacy.",
            },
            card5: {
              title: "Fully Accessible",
              description:
                "Utilizing the latest web technologies, BlueScript is designed to be accessible on all devices, ensuring inclusivity for all users.",
            },
            card6: {
              title: "Scientifically Backed",
              description:
                "BlueScript's training methods are developed and validated by experts with over two decades of dyslexia research experience.",
            },
          },
        },
      },
      nav: {
        home: "Home",
        train: "Training",
        result: "Result",
      },
      unit: {
        sec: "s",
        min: "m",
      },
      train: {
        title: "Configure Training",
        start: "Start Training",
      },
      training: {
        ready: "Get Ready!",
        trial: "Trial",
        timeSpent: "Time Spent:",
        accuracy: "Accuracy:",
        elapsed: "Elapsed Time:",
        typeAnswer:
          "Please type the characters you saw\n(Press Enter or space to submit)",
        correct: "Correct!\n(Press Enter or space to continue)",
        incorrect: "Incorrect!\n(Press Enter or space to continue)",
        sequencingInstruction:
          "Press the right arrow to move the cursor\n(press Enter or spacebar to select)",
        finish: "Finish!",
        continue: "Press spacebar or enter to continue",
        findMatch: "Find the matching character",
        remaining: " remaining",
        guess: "Press the key that matches the character getting revealed",
      },

      parameter: {
        durationMin: "Duration (min)",
        stimuliType: "Stimuli Type",
        stimuliLength: "Stimuli Length",
        presentationTime: "Presentation Time (s)",
        delayTime: "Delay Time (s)",
        promptType: "Prompt Type",
        promptLength: "Prompt Length",
        targetLength: "Target Length",
        targetCount: "Target Count",
        chunkSize: "Chunk Size",
        Numbers: "Numbers",
        Alphabet: "Alphabet",
        Alphanumeric: "Alphanumeric",
        Korean: "Korean",
        Sequential: "Sequential",
        Random: "Random",
        Small: "Small",
        Medium: "Medium",
        Large: "Large",
      },

      procedure: {
        "Rapid Visual Perception": "Rapid Visual Perception",
        "Sequential Visual Memory": "Sequential Visual Memory",
        "Character Sequencing": "Character Sequencing",
        "Character Matching": "Character Matching",
        "Character Guesstimate": "Character Guesstimate",
      },

      result: {
        date: "Date",
        trainer: "Trainer",
        trainee: "Trainee",
        trainingParameters: "Training Parameters",
        notesPlaceholder: "Write your notes here...",
        title: "Training Result",
        noData: "No Data Loaded",
        noDataDesc: "Please load a training result or start a new training.",
        download: "Download Result",
        goTrain: "Go Training",
        averageRevealed: "Average Revealed",
        averageRevealedDesc:
          "Average percentage of revealed chunks of a character",
        accuracy: "Accuracy",
        accuracyDesc: "Percentage of correct responses",
        averageAccuracy: "Average Accuracy",
        averageAccuracyDesc: "Average accuracy of all trials",
        trials: "Trials",
        trialsDesc: "Record of all trials performed",
        averageTrialTime: "Average Trial Time",
        averageTrialTimeDesc: "Average time spent on each trial (in seconds)",
        elapsedTime: "Elapsed Time",
        elapsedTimeDesc: "Actual time spent on training",
        trialCount: "Trial Count",
        trialCountDesc: "Number of trials performed",
        correctCount: "Correct Count",
        correctCountDesc: "Number of correct responses",
      },
    },
    ko: {
      landing: {
        title: "BlueScript",
        cta: "훈련 시작",
        description:
          "BlueScript는 난독증이 있는 사람들을 돕기 위해 무료 및 오픈 소스 도구를 개발하는 비영리 단체입니다.",
        features: {
          title: "BlueScript를 선택하는 이유",
          description:
            "BlueScript는 난독증을 겪는 사람들을 지원하기 위해 무료 및 오픈 소스 도구를 개발하는 비영리 단체입니다.",
          headline: "주요 기능",
          items: {
            card1: {
              title: "사용자 친화적",
              description:
                "BlueScript는 가정에서 사용하기 쉽게 설계되어 전문적인 도움 없이도 난독증을 가진 사람들이 혜택을 받을 수 있습니다.",
            },
            card2: {
              title: "항상 무료",
              description:
                "접근성을 중요시하는 BlueScript는 모든 사람이 필수 난독증 지원 도구에 무료로 접근할 수 있도록 보장합니다.",
            },
            card3: {
              title: "오픈 소스",
              description:
                "BlueScript는 모든 사람의 기여를 환영합니다. 소스 코드를 액세스하여 자유롭게 수정, 개선 및 혁신할 수 있습니다.",
            },
            card4: {
              title: "프라이버시 우선",
              description:
                "BlueScript는 개인 정보를 수집하지 않음으로써 프라이버시를 최우선으로 생각하며 기본적인 프라이버시 권리를 보장합니다.",
            },
            card5: {
              title: "완전한 접근성",
              description:
                "최신 웹 기술을 활용하여 BlueScript는 모든 기기에서 접근할 수 있도록 설계되어 모든 사용자를 포용합니다.",
            },
            card6: {
              title: "과학적 뒷받침",
              description:
                "BlueScript의 훈련 방법은 20년 이상의 난독증 연구 경험을 가진 전문가들에 의해 개발되고 검증되었습니다.",
            },
          },
        },
      },
      unit: {
        sec: "초",
        min: "분",
      },
      nav: {
        home: "홈",
        train: "훈련",
        result: "결과",
      },
      train: {
        title: "훈련 설정",
        start: "훈련 시작",
      },
      training: {
        ready: "준비하세요!",
        trial: "시도",
        elapsed: "경과 시간:",
        timeSpent: "소요 시간:",
        accuracy: "정확도:",
        typeAnswer: "보았던 문자를 입력해주세요\n(엔터나 스페이스를 눌러 제출)",
        correct: "정답입니다!\n(엔터나 스페이스를 눌러 계속)",
        incorrect: "오답입니다!\n(엔터나 스페이스를 눌러 계속)",
        sequencingInstruction:
          "오른쪽 화살표를 눌러 커서를 이동하세요\n(엔터나 스페이스를 눌러 선택)",
        finish: "완료!",
        continue: "계속하려면 스페이스나 엔터를 눌러주세요",
        findMatch: "보기와 일치하는 문자를 찾으세요",
        remaining: "개 남음",
        guess: "서서히 보여지는 문자와 일치하는 키를 눌러주세요",
      },
      parameter: {
        durationMin: "시간 (분)",
        stimuliType: "문자 종류",
        stimuliLength: "문자 길이",
        presentationTime: "표시 시간 (초)",
        delayTime: "지연 시간 (초)",
        promptType: "프롬프트 종류",
        promptLength: "프롬프트 길이",
        targetLength: "정답 길이",
        targetCount: "정답 개수",
        chunkSize: "블록 크기",
        Numbers: "숫자",
        Alphabet: "알파벳",
        Alphanumeric: "알파벳 + 숫자",
        Korean: "한글",
        Sequential: "순차적",
        Random: "임의",
        Small: "소",
        Medium: "중",
        Large: "대",
      },
      procedure: {
        "Rapid Visual Perception": "빠른 시각 인지",
        "Sequential Visual Memory": "순차적 시각 기억",
        "Character Sequencing": "문자 시퀀싱",
        "Character Matching": "문자 매칭",
        "Character Guesstimate": "문자 추정",
      },

      result: {
        date: "날짜",
        trainer: "트레이너",
        trainee: "훈련생",
        trainingParameters: "훈련 설정",
        notesPlaceholder: "메모를 입력해주세요",
        title: "훈련 결과",
        noData: "데이터 없음",
        download: "결과 다운로드",
        noDataDesc: "훈련 결과를 불러오거나 새로운 훈련을 시작해주세요.",
        goTrain: "훈련 하기",
        averageRevealed: "평균 드러난 정도",
        averageRevealedDesc: "문자의 평균 드러난 블록 비율",
        accuracy: "정확도",
        accuracyDesc: "정답 비율",
        averageAccuracy: "평균 정확도",
        averageAccuracyDesc: "모든 시도의 평균 정확도",
        trials: "시도",
        trialsDesc: "모든 시도의 기록",
        averageTrialTime: "평균 시도 시간",
        averageTrialTimeDesc: "각 시도에 소요된 평균 시간 (초)",
        elapsedTime: "경과 시간",
        elapsedTimeDesc: "훈련에 소요된 실제 시간",
        trialCount: "시도 횟수",
        trialCountDesc: "실행된 시도의 수",
        correctCount: "정답 수",
        correctCountDesc: "정답 응답의 수",
      },
    },

    es: {
      landing: {
        title: "BlueScript",
        cta: "Comenzar Entrenamiento",
        description:
          "BlueScript es una organización sin fines de lucro que desarrolla herramientas gratuitas y de código abierto para ayudar a las personas con dislexia.",
        features: {
          title: "¿Por Qué Elegir BlueScript?",
          description:
            "BlueScript es una organización sin fines de lucro dedicada a desarrollar herramientas gratuitas y de código abierto que apoyan a las personas con dislexia.",
          headline: "Características Clave",
          items: {
            card1: {
              title: "Fácil de Usar",
              description:
                "BlueScript está diseñado de manera intuitiva para el uso doméstico, permitiendo que las personas con dislexia se beneficien sin necesitar asistencia profesional.",
            },
            card2: {
              title: "Siempre Gratis",
              description:
                "Comprometido con la accesibilidad, BlueScript asegura que todos tengan acceso gratuito a herramientas esenciales de apoyo para la dislexia.",
            },
            card3: {
              title: "Código Abierto",
              description:
                "BlueScript da la bienvenida a contribuciones de todos. Accede a nuestro código fuente para modificar, mejorar e innovar libremente.",
            },
            card4: {
              title: "Privacidad Primero",
              description:
                "BlueScript prioriza tu privacidad al no recopilar ninguna información personal, manteniendo tu derecho fundamental a la privacidad.",
            },
            card5: {
              title: "Totalmente Accesible",
              description:
                "Utilizando las últimas tecnologías web, BlueScript está diseñado para ser accesible en todos los dispositivos, asegurando inclusión para todos los usuarios.",
            },
            card6: {
              title: "Científicamente Respaldado",
              description:
                "Los métodos de entrenamiento de BlueScript son desarrollados y validados por expertos con más de dos décadas de experiencia en investigación sobre dislexia.",
            },
          },
        },
      },
      nav: {
        home: "Inicio",
        train: "Entrenamiento",
        result: "Resultado",
      },
      unit: {
        sec: "s",
        min: "m",
      },
      train: {
        title: "Configurar Entrenamiento",
        start: "Iniciar Entrenamiento",
      },
      training: {
        ready: "¡Prepárate!",
        trial: "Ensayo",
        timeSpent: "Tiempo Gastado:",
        accuracy: "Precisión:",
        elapsed: "Tiempo Transcurrido:",
        typeAnswer:
          "Por favor, escribe los caracteres que viste\n(Presiona Enter o espacio para enviar)",
        correct: "¡Correcto!\n(Presiona Enter o espacio para continuar)",
        incorrect: "¡Incorrecto!\n(Presiona Enter o espacio para continuar)",
        sequencingInstruction:
          "Presiona la flecha derecha para mover el cursor\n(presiona Enter o espacio para seleccionar)",
        finish: "¡Terminar!",
        continue: "Presiona barra espaciadora o Enter para continuar",
        findMatch: "Encuentra el carácter coincidente",
        remaining: " restantes",
        guess:
          "Presiona la tecla que coincide con el carácter que se está revelando",
      },
      parameter: {
        durationMin: "Duración (min)",
        stimuliType: "Tipo de Estímulo",
        stimuliLength: "Longitud del Estímulo",
        presentationTime: "Tiempo de Presentación (s)",
        delayTime: "Tiempo de Retardo (s)",
        promptType: "Tipo de Prompt",
        promptLength: "Longitud del Prompt",
        targetLength: "Longitud del Objetivo",
        targetCount: "Cantidad de Objetivos",
        chunkSize: "Tamaño del Bloque",
        Numbers: "Números",
        Alphabet: "Alfabeto",
        Alphanumeric: "Alfanumérico",
        Korean: "Coreano",
        Sequential: "Secuencial",
        Random: "Aleatorio",
        Small: "Pequeño",
        Medium: "Mediano",
        Large: "Grande",
      },
      procedure: {
        "Rapid Visual Perception": "Percepción Visual Rápida",
        "Sequential Visual Memory": "Memoria Visual Secuencial",
        "Character Sequencing": "Secuenciación de Caracteres",
        "Character Matching": "Emparejamiento de Caracteres",
        "Character Guesstimate": "Estimación de Caracteres",
      },
      result: {
        date: "Fecha",
        trainer: "Entrenador",
        trainee: "Entrenado",
        trainingParameters: "Parámetros de Entrenamiento",
        notesPlaceholder: "Escribe tus notas aquí...",
        title: "Resultado del Entrenamiento",
        noData: "No se Cargaron Datos",
        noDataDesc:
          "Por favor, carga un resultado de entrenamiento o inicia un nuevo entrenamiento.",
        download: "Descargar Resultado",
        goTrain: "Ir al Entrenamiento",
        averageRevealed: "Promedio Revelado",
        averageRevealedDesc:
          "Porcentaje promedio de bloques revelados de un carácter",
        accuracy: "Precisión",
        accuracyDesc: "Porcentaje de respuestas correctas",
        averageAccuracy: "Precisión Promedio",
        averageAccuracyDesc: "Precisión promedio de todos los ensayos",
        trials: "Ensayos",
        trialsDesc: "Registro de todos los ensayos realizados",
        averageTrialTime: "Tiempo Promedio por Ensayo",
        averageTrialTimeDesc:
          "Tiempo promedio gastado en cada ensayo (en segundos)",
        elapsedTime: "Tiempo Transcurrido",
        elapsedTimeDesc: "Tiempo real gastado en el entrenamiento",
        trialCount: "Cantidad de Ensayos",
        trialCountDesc: "Número de ensayos realizados",
        correctCount: "Cantidad de Correctas",
        correctCountDesc: "Número de respuestas correctas",
      },
    },
  },
}));
