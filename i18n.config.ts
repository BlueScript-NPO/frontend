export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",

  messages: {
    en: {
      landing: {
        title: "BlueScript",
        cta: "Start Training",
        github: "Get the source code",
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
                "BlueScript is intuitively designed for individual use, enabling individuals with dyslexia to benefit with minimal professional assistance.",
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
        github: "소스코드 받기",
        description:
          "BlueScript는 난독증이 있는 사람들을 돕기 위한 무료 및 오픈 소스 도구입니다.",
        features: {
          title: "BlueScript를 선택하는 이유",
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
        cta: "Comenzar entrenamiento",
        github: "Obtener el código fuente",
        description:
          "BlueScript es una organización sin fines de lucro que desarrolla herramientas gratuitas y de código abierto para ayudar a las personas con dislexia.",
        features: {
          title: "¿Por qué elegir BlueScript?",
          description:
            "BlueScript es una organización sin fines de lucro dedicada a desarrollar herramientas gratuitas y de código abierto que apoyan a las personas con dislexia.",
          headline: "Características clave",
          items: {
            card1: {
              title: "Fácil de usar",
              description:
                "BlueScript está diseñado de manera intuitiva para uso individual, permitiendo que las personas con dislexia se beneficien con mínima asistencia profesional.",
            },
            card2: {
              title: "Siempre gratis",
              description:
                "Comprometido con la accesibilidad, BlueScript asegura que todos tengan acceso gratuito a las herramientas esenciales de apoyo a la dislexia.",
            },
            card3: {
              title: "Código abierto",
              description:
                "BlueScript da la bienvenida a las contribuciones de todos. Accede a nuestro código fuente para modificar, mejorar e innovar libremente.",
            },
            card4: {
              title: "Privacidad ante todo",
              description:
                "BlueScript prioriza tu privacidad al no recopilar ninguna información personal, defendiendo tu derecho fundamental a la privacidad.",
            },
            card5: {
              title: "Totalmente accesible",
              description:
                "Utilizando las últimas tecnologías web, BlueScript está diseñado para ser accesible en todos los dispositivos, garantizando la inclusión para todos los usuarios.",
            },
            card6: {
              title: "Respaldado científicamente",
              description:
                "Los métodos de entrenamiento de BlueScript son desarrollados y validados por expertos con más de dos décadas de experiencia en investigación sobre la dislexia.",
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
    zh: {
      landing: {
        title: "BlueScript",
        cta: "开始训练",
        github: "获取源代码",
        description:
          "BlueScript 是一个非营利组织，开发免费和开源工具来帮助有阅读障碍的人。",
        features: {
          title: "为什么选择 BlueScript？",
          description:
            "BlueScript 是一个致力于开发免费和开源工具来支持阅读障碍者的非营利组织。",
          headline: "主要特点",
          items: {
            card1: {
              title: "用户友好",
              description:
                "BlueScript 直观设计，个人使用，帮助阅读障碍者在最少的专业协助下受益。",
            },
            card2: {
              title: "永远免费",
              description:
                "致力于可访问性，BlueScript 确保每个人都可以免费获得必需的阅读障碍支持工具。",
            },
            card3: {
              title: "开源",
              description:
                "BlueScript 欢迎所有人的贡献。访问我们的源代码，自由修改、增强和创新。",
            },
            card4: {
              title: "隐私优先",
              description:
                "BlueScript 重视您的隐私，不收集任何个人信息，维护您的基本隐私权。",
            },
            card5: {
              title: "完全可访问",
              description:
                "利用最新的网络技术，BlueScript 设计为在所有设备上可访问，确保所有用户的包容性。",
            },
            card6: {
              title: "科学支持",
              description:
                "BlueScript 的训练方法由具有超过二十年阅读障碍研究经验的专家开发和验证。",
            },
          },
        },
      },
      nav: {
        home: "首页",
        train: "训练",
        result: "结果",
      },
      unit: {
        sec: "秒",
        min: "分钟",
      },
      train: {
        title: "配置训练",
        start: "开始训练",
      },
      training: {
        ready: "准备好了！",
        trial: "试验",
        timeSpent: "花费时间：",
        accuracy: "准确度：",
        elapsed: "已用时间：",
        typeAnswer: "请键入您看到的字符\n（按 Enter 或空格提交）",
        correct: "正确！\n（按 Enter 或空格继续）",
        incorrect: "错误！\n（按 Enter 或空格继续）",
        sequencingInstruction: "按右箭头移动光标\n（按 Enter 或空格选择）",
        finish: "完成！",
        continue: "按空格或 Enter 继续",
        findMatch: "找到匹配的字符",
        remaining: " 剩余",
        guess: "按下与显示字符匹配的键",
      },

      parameter: {
        durationMin: "时长（分钟）",
        stimuliType: "刺激类型",
        stimuliLength: "刺激长度",
        presentationTime: "展示时间（秒）",
        delayTime: "延迟时间（秒）",
        promptType: "提示类型",
        promptLength: "提示长度",
        targetLength: "目标长度",
        targetCount: "目标数量",
        chunkSize: "块大小",
        Numbers: "数字",
        Alphabet: "字母",
        Alphanumeric: "字母数字",
        Korean: "韩语",
        Sequential: "顺序",
        Random: "随机",
        Small: "小",
        Medium: "中",
        Large: "大",
      },

      procedure: {
        "Rapid Visual Perception": "快速视觉感知",
        "Sequential Visual Memory": "顺序视觉记忆",
        "Character Sequencing": "字符排序",
        "Character Matching": "字符匹配",
        "Character Guesstimate": "字符猜测",
      },

      result: {
        date: "日期",
        trainer: "训练师",
        trainee: "受训者",
        trainingParameters: "训练参数",
        notesPlaceholder: "在这里写下您的笔记...",
        title: "训练结果",
        noData: "未加载数据",
        noDataDesc: "请加载训练结果或开始新的训练。",
        download: "下载结果",
        goTrain: "去训练",
        averageRevealed: "平均揭示",
        averageRevealedDesc: "字符段平均揭示百分比",
        accuracy: "准确度",
        accuracyDesc: "正确反应的百分比",
        averageAccuracy: "平均准确度",
        averageAccuracyDesc: "所有试验的平均准确度",
        trials: "试验",
        trialsDesc: "所有进行的试验记录",
        averageTrialTime: "平均试验时间",
        averageTrialTimeDesc: "每次试验花费的平均时间（以秒计）",
        elapsedTime: "已用时间",
        elapsedTimeDesc: "训练所花费的实际时间",
        trialCount: "试验次数",
        trialCountDesc: "进行的试验次数",
        correctCount: "正确次数",
        correctCountDesc: "正确反应的次数",
      },
    },
    ja: {
      landing: {
        title: "BlueScript",
        cta: "トレーニングを開始",
        github: "ソースコードを取得",
        description:
          "BlueScript は、失読症の方々を支援するための無料およびオープンソースのツールを開発する非営利団体です。",
        features: {
          title: "BlueScriptを選ぶ理由",
          description:
            "BlueScript は、失読症の方々を支援するための無料およびオープンソースのツールを開発する非営利団体です。",
          headline: "主な特徴",
          items: {
            card1: {
              title: "ユーザーフレンドリー",
              description:
                "BlueScript は個人使用のために直感的に設計されており、最小限の専門的な支援で失読症の方々が恩恵を受けられます。",
            },
            card2: {
              title: "常に無料",
              description:
                "アクセシビリティを重視する BlueScript は、誰もが必要な失読症サポートツールに無料でアクセスできることを保証します。",
            },
            card3: {
              title: "オープンソース",
              description:
                "BlueScript は、誰でも自由に貢献できるようにしています。ソースコードにアクセスして自由に変更、強化、革新してください。",
            },
            card4: {
              title: "プライバシー重視",
              description:
                "BlueScript は個人情報を収集せず、基本的なプライバシーの権利を守ることを最優先にしています。",
            },
            card5: {
              title: "完全にアクセス可能",
              description:
                "最新のウェブ技術を利用して、BlueScript はすべてのデバイスでアクセスできるように設計されており、すべてのユーザーに対して包括性を確保します。",
            },
            card6: {
              title: "科学的に裏付けられた",
              description:
                "BlueScript のトレーニング方法は、20年以上の失読症研究経験を持つ専門家によって開発および検証されています。",
            },
          },
        },
      },
      nav: {
        home: "ホーム",
        train: "トレーニング",
        result: "結果",
      },
      unit: {
        sec: "秒",
        min: "分",
      },
      train: {
        title: "トレーニングの設定",
        start: "トレーニングを開始",
      },
      training: {
        ready: "準備完了！",
        trial: "試験",
        timeSpent: "費やした時間：",
        accuracy: "正確さ：",
        elapsed: "経過時間：",
        typeAnswer:
          "見た文字を入力してください\n（Enter またはスペースキーを押して送信）",
        correct: "正解！\n（Enter またはスペースキーを押して続行）",
        incorrect: "不正解！\n（Enter またはスペースキーを押して続行）",
        sequencingInstruction:
          "右矢印キーを押してカーソルを移動\n（Enter またはスペースキーを押して選択）",
        finish: "完了！",
        continue: "続行するにはスペースキーまたはEnterキーを押してください",
        findMatch: "一致する文字を見つける",
        remaining: " 残り",
        guess: "徐々に明らかになる文字に一致するキーを押してください",
      },

      parameter: {
        durationMin: "時間（分）",
        stimuliType: "刺激タイプ",
        stimuliLength: "刺激の長さ",
        presentationTime: "提示時間（秒）",
        delayTime: "遅延時間（秒）",
        promptType: "プロンプトタイプ",
        promptLength: "プロンプトの長さ",
        targetLength: "ターゲットの長さ",
        targetCount: "ターゲット数",
        chunkSize: "チャンクサイズ",
        Numbers: "数字",
        Alphabet: "アルファベット",
        Alphanumeric: "英数字",
        Korean: "韓国語",
        Sequential: "シーケンシャル",
        Random: "ランダム",
        Small: "小",
        Medium: "中",
        Large: "大",
      },

      procedure: {
        "Rapid Visual Perception": "迅速な視覚認知",
        "Sequential Visual Memory": "順次視覚記憶",
        "Character Sequencing": "文字シーケンス",
        "Character Matching": "文字一致",
        "Character Guesstimate": "文字推測",
      },

      result: {
        date: "日付",
        trainer: "トレーナー",
        trainee: "トレイニー",
        trainingParameters: "トレーニングパラメータ",
        notesPlaceholder: "ここにメモを書いてください...",
        title: "トレーニング結果",
        noData: "データが読み込まれていません",
        noDataDesc:
          "トレーニング結果を読み込むか、新しいトレーニングを開始してください。",
        download: "結果をダウンロード",
        goTrain: "トレーニングに行く",
        averageRevealed: "平均開示",
        averageRevealedDesc: "キャラクターのチャンクの平均開示率",
        accuracy: "正確さ",
        accuracyDesc: "正解率の割合",
        averageAccuracy: "平均正確さ",
        averageAccuracyDesc: "すべての試行の平均正確さ",
        trials: "試行",
        trialsDesc: "実施したすべての試行の記録",
        averageTrialTime: "平均試行時間",
        averageTrialTimeDesc: "各試行に費やした平均時間（秒）",
        elapsedTime: "経過時間",
        elapsedTimeDesc: "トレーニングに費やした実際の時間",
        trialCount: "試行回数",
        trialCountDesc: "実施した試行回数",
        correctCount: "正解数",
        correctCountDesc: "正解の回数",
      },
    },
    fr: {
      landing: {
        title: "BlueScript",
        cta: "Commencer l'entraînement",
        github: "Obtenez le code source",
        description:
          "BlueScript est une organisation à but non lucratif qui développe des outils gratuits et open-source pour aider les personnes dyslexiques.",
        features: {
          title: "Pourquoi choisir BlueScript ?",
          description:
            "BlueScript est une organisation à but non lucratif dédiée au développement d'outils gratuits et open-source qui soutiennent les personnes dyslexiques.",
          headline: "Caractéristiques principales",
          items: {
            card1: {
              title: "Facile à utiliser",
              description:
                "BlueScript est conçu de manière intuitive pour une utilisation individuelle, permettant aux personnes dyslexiques de bénéficier d'une assistance professionnelle minimale.",
            },
            card2: {
              title: "Toujours gratuit",
              description:
                "Engagé pour l'accessibilité, BlueScript veille à ce que chacun ait un accès gratuit aux outils de soutien essentiels à la dyslexie.",
            },
            card3: {
              title: "Open Source",
              description:
                "BlueScript accueille les contributions de tous. Accédez à notre code source pour modifier, améliorer et innover librement.",
            },
            card4: {
              title: "Confidentialité avant tout",
              description:
                "BlueScript priorise votre vie privée en ne collectant aucune information personnelle, respectant ainsi votre droit fondamental à la vie privée.",
            },
            card5: {
              title: "Entièrement accessible",
              description:
                "En utilisant les dernières technologies web, BlueScript est conçu pour être accessible sur tous les appareils, garantissant l'inclusion de tous les utilisateurs.",
            },
            card6: {
              title: "Scientifiquement validé",
              description:
                "Les méthodes de formation de BlueScript sont développées et validées par des experts ayant plus de vingt ans d'expérience en recherche sur la dyslexie.",
            },
          },
        },
      },
      nav: {
        home: "Accueil",
        train: "Entraînement",
        result: "Résultat",
      },
      unit: {
        sec: "s",
        min: "m",
      },
      train: {
        title: "Configurer l'entraînement",
        start: "Commencer l'entraînement",
      },
      training: {
        ready: "Prêt ?",
        trial: "Essai",
        timeSpent: "Temps passé :",
        accuracy: "Précision :",
        elapsed: "Temps écoulé :",
        typeAnswer:
          "Veuillez taper les caractères que vous avez vus\n(Appuyez sur Entrée ou Espace pour soumettre)",
        correct: "Correct !\n(Appuyez sur Entrée ou Espace pour continuer)",
        incorrect: "Incorrect !\n(Appuyez sur Entrée ou Espace pour continuer)",
        sequencingInstruction:
          "Appuyez sur la flèche droite pour déplacer le curseur\n(appuyez sur Entrée ou Espace pour sélectionner)",
        finish: "Terminé !",
        continue: "Appuyez sur Espace ou Entrée pour continuer",
        findMatch: "Trouvez le caractère correspondant",
        remaining: " restant",
        guess: "Appuyez sur la touche correspondant au caractère qui se révèle",
      },

      parameter: {
        durationMin: "Durée (min)",
        stimuliType: "Type de stimulus",
        stimuliLength: "Longueur du stimulus",
        presentationTime: "Temps de présentation (s)",
        delayTime: "Temps de retard (s)",
        promptType: "Type d'invite",
        promptLength: "Longueur de l'invite",
        targetLength: "Longueur de la cible",
        targetCount: "Nombre de cibles",
        chunkSize: "Taille du segment",
        Numbers: "Nombres",
        Alphabet: "Alphabet",
        Alphanumeric: "Alphanumérique",
        Korean: "Coréen",
        Sequential: "Séquentiel",
        Random: "Aléatoire",
        Small: "Petit",
        Medium: "Moyen",
        Large: "Grand",
      },

      procedure: {
        "Rapid Visual Perception": "Perception visuelle rapide",
        "Sequential Visual Memory": "Mémoire visuelle séquentielle",
        "Character Sequencing": "Séquençage de caractères",
        "Character Matching": "Correspondance de caractères",
        "Character Guesstimate": "Estimation de caractères",
      },

      result: {
        date: "Date",
        trainer: "Formateur",
        trainee: "Apprenant",
        trainingParameters: "Paramètres d'entraînement",
        notesPlaceholder: "Écrivez vos notes ici...",
        title: "Résultat de l'entraînement",
        noData: "Aucune donnée chargée",
        noDataDesc:
          "Veuillez charger un résultat d'entraînement ou commencer un nouvel entraînement.",
        download: "Télécharger le résultat",
        goTrain: "Aller à l'entraînement",
        averageRevealed: "Moyenne révélée",
        averageRevealedDesc:
          "Pourcentage moyen de segments révélés d'un caractère",
        accuracy: "Précision",
        accuracyDesc: "Pourcentage de réponses correctes",
        averageAccuracy: "Précision moyenne",
        averageAccuracyDesc: "Précision moyenne de tous les essais",
        trials: "Essais",
        trialsDesc: "Enregistrement de tous les essais effectués",
        averageTrialTime: "Temps moyen d'essai",
        averageTrialTimeDesc:
          "Temps moyen passé sur chaque essai (en secondes)",
        elapsedTime: "Temps écoulé",
        elapsedTimeDesc: "Temps réel passé à l'entraînement",
        trialCount: "Nombre d'essais",
        trialCountDesc: "Nombre d'essais effectués",
        correctCount: "Nombre de réponses correctes",
        correctCountDesc: "Nombre de réponses correctes",
      },
    },
    ar: {
      landing: {
        title: "BlueScript",
        cta: "ابدأ التدريب",
        github: "احصل على الكود المصدري",
        description:
          "BlueScript هي منظمة غير ربحية تطور أدوات مجانية ومفتوحة المصدر لمساعدة الأفراد الذين يعانون من عسر القراءة.",
        features: {
          title: "لماذا تختار BlueScript؟",
          description:
            "BlueScript هي منظمة غير ربحية مكرسة لتطوير أدوات مجانية ومفتوحة المصدر تدعم الأفراد الذين يعانون من عسر القراءة.",
          headline: "الميزات الرئيسية",
          items: {
            card1: {
              title: "سهل الاستخدام",
              description:
                "تم تصميم BlueScript بواجهة سهلة الاستخدام للأفراد، مما يتيح للأشخاص الذين يعانون من عسر القراءة الاستفادة بأقل مساعدة مهنية.",
            },
            card2: {
              title: "دائماً مجاني",
              description:
                "ملتزمون بتوفير الأدوات الضرورية لدعم عسر القراءة مجانًا للجميع.",
            },
            card3: {
              title: "مفتوح المصدر",
              description:
                "يرحب BlueScript بمساهمات الجميع. احصل على الكود المصدري لتعديله وتحسينه وابتكاره بحرية.",
            },
            card4: {
              title: "الخصوصية أولاً",
              description:
                "BlueScript يعطي الأولوية لخصوصيتك بعدم جمع أي معلومات شخصية، مما يحافظ على حقك الأساسي في الخصوصية.",
            },
            card5: {
              title: "متاح بالكامل",
              description:
                "بفضل استخدام أحدث تقنيات الويب، تم تصميم BlueScript ليكون متاحًا على جميع الأجهزة، مما يضمن الشمولية لجميع المستخدمين.",
            },
            card6: {
              title: "مدعوم علمياً",
              description:
                "تم تطوير وتأكيد طرق التدريب في BlueScript من قبل خبراء لديهم أكثر من عقدين من البحث في عسر القراءة.",
            },
          },
        },
      },
      nav: {
        home: "الرئيسية",
        train: "التدريب",
        result: "النتيجة",
      },
      unit: {
        sec: "ث",
        min: "د",
      },
      train: {
        title: "إعداد التدريب",
        start: "ابدأ التدريب",
      },
      training: {
        ready: "استعد!",
        trial: "تجربة",
        timeSpent: "الوقت المستغرق:",
        accuracy: "الدقة:",
        elapsed: "الوقت المنقضي:",
        typeAnswer:
          "الرجاء كتابة الأحرف التي رأيتها\n(اضغط Enter أو المسافة للإرسال)",
        correct: "صحيح!\n(اضغط Enter أو المسافة للمتابعة)",
        incorrect: "خطأ!\n(اضغط Enter أو المسافة للمتابعة)",
        sequencingInstruction:
          "اضغط على السهم الأيمن لتحريك المؤشر\n(اضغط Enter أو المسافة للاختيار)",
        finish: "انتهى!",
        continue: "اضغط على المسافة أو Enter للمتابعة",
        findMatch: "ابحث عن الحرف المطابق",
        remaining: " متبقي",
        guess: "اضغط على المفتاح الذي يتطابق مع الحرف الذي يظهر",
      },

      parameter: {
        durationMin: "المدة (دقائق)",
        stimuliType: "نوع التحفيز",
        stimuliLength: "طول التحفيز",
        presentationTime: "وقت العرض (ثواني)",
        delayTime: "وقت التأخير (ثواني)",
        promptType: "نوع الموجه",
        promptLength: "طول الموجه",
        targetLength: "طول الهدف",
        targetCount: "عدد الأهداف",
        chunkSize: "حجم القطعة",
        Numbers: "أرقام",
        Alphabet: "أبجدية",
        Alphanumeric: "أبجدية رقمية",
        Korean: "كوري",
        Sequential: "تسلسلي",
        Random: "عشوائي",
        Small: "صغير",
        Medium: "متوسط",
        Large: "كبير",
      },

      procedure: {
        "Rapid Visual Perception": "الإدراك البصري السريع",
        "Sequential Visual Memory": "الذاكرة البصرية التسلسلية",
        "Character Sequencing": "تسلسل الأحرف",
        "Character Matching": "مطابقة الأحرف",
        "Character Guesstimate": "تخمين الأحرف",
      },

      result: {
        date: "التاريخ",
        trainer: "المدرب",
        trainee: "المتدرب",
        trainingParameters: "معايير التدريب",
        notesPlaceholder: "اكتب ملاحظاتك هنا...",
        title: "نتيجة التدريب",
        noData: "لم يتم تحميل البيانات",
        noDataDesc: "يرجى تحميل نتيجة تدريب أو بدء تدريب جديد.",
        download: "تحميل النتيجة",
        goTrain: "الذهاب للتدريب",
        averageRevealed: "متوسط الكشوف",
        averageRevealedDesc: "متوسط نسبة القطع المكشوفة من الحرف",
        accuracy: "الدقة",
        accuracyDesc: "نسبة الإجابات الصحيحة",
        averageAccuracy: "متوسط الدقة",
        averageAccuracyDesc: "متوسط الدقة لجميع التجارب",
        trials: "التجارب",
        trialsDesc: "سجل جميع التجارب المنفذة",
        averageTrialTime: "متوسط وقت التجربة",
        averageTrialTimeDesc: "متوسط الوقت المستغرق في كل تجربة (بالثواني)",
        elapsedTime: "الوقت المنقضي",
        elapsedTimeDesc: "الوقت الفعلي المستغرق في التدريب",
        trialCount: "عدد التجارب",
        trialCountDesc: "عدد التجارب المنفذة",
        correctCount: "عدد الإجابات الصحيحة",
        correctCountDesc: "عدد الإجابات الصحيحة",
      },
    },
    hi: {
      landing: {
        title: "BlueScript",
        cta: "प्रशिक्षण प्रारंभ करें",
        github: "सोर्स कोड प्राप्त करें",
        description:
          "BlueScript एक गैर-लाभकारी संगठन है जो डिस्लेक्सिया वाले व्यक्तियों की मदद के लिए मुफ्त और ओपन-सोर्स उपकरण विकसित करता है।",
        features: {
          title: "BlueScript क्यों चुनें?",
          description:
            "BlueScript एक गैर-लाभकारी संगठन है जो डिस्लेक्सिया वाले व्यक्तियों का समर्थन करने के लिए मुफ्त और ओपन-सोर्स उपकरण विकसित करने के लिए समर्पित है।",
          headline: "मुख्य विशेषताएं",
          items: {
            card1: {
              title: "उपयोगकर्ता के अनुकूल",
              description:
                "BlueScript को व्यक्तिगत उपयोग के लिए सहजता से डिज़ाइन किया गया है, जिससे डिस्लेक्सिया वाले व्यक्तियों को न्यूनतम पेशेवर सहायता के साथ लाभ मिलता है।",
            },
            card2: {
              title: "हमेशा मुफ्त",
              description:
                "सुलभता के लिए प्रतिबद्ध, BlueScript सुनिश्चित करता है कि हर किसी के पास आवश्यक डिस्लेक्सिया समर्थन उपकरणों तक मुफ्त पहुंच हो।",
            },
            card3: {
              title: "ओपन सोर्स",
              description:
                "BlueScript सभी के योगदान का स्वागत करता है। हमारे सोर्स कोड को एक्सेस करें और स्वतंत्र रूप से संशोधित, सुधार और नवाचार करें।",
            },
            card4: {
              title: "गोपनीयता प्राथमिकता",
              description:
                "BlueScript आपकी गोपनीयता को महत्व देता है और किसी भी व्यक्तिगत जानकारी को एकत्र नहीं करता, जिससे आपकी मूलभूत गोपनीयता का अधिकार सुरक्षित रहता है।",
            },
            card5: {
              title: "पूरी तरह से सुलभ",
              description:
                "नवीनतम वेब तकनीकों का उपयोग करते हुए, BlueScript को सभी उपकरणों पर सुलभ होने के लिए डिज़ाइन किया गया है, जिससे सभी उपयोगकर्ताओं के लिए समावेश सुनिश्चित होता है।",
            },
            card6: {
              title: "वैज्ञानिक रूप से समर्थित",
              description:
                "BlueScript के प्रशिक्षण विधियों को विशेषज्ञों द्वारा दो दशकों से अधिक के डिस्लेक्सिया अनुसंधान अनुभव के साथ विकसित और मान्य किया गया है।",
            },
          },
        },
      },
      nav: {
        home: "होम",
        train: "प्रशिक्षण",
        result: "परिणाम",
      },
      unit: {
        sec: "सेकंड",
        min: "मिनट",
      },
      train: {
        title: "प्रशिक्षण कॉन्फ़िगर करें",
        start: "प्रशिक्षण प्रारंभ करें",
      },
      training: {
        ready: "तैयार हो जाइए!",
        trial: "परीक्षण",
        timeSpent: "खर्च किया गया समय:",
        accuracy: "सटीकता:",
        elapsed: "बीता हुआ समय:",
        typeAnswer:
          "कृपया वह वर्ण टाइप करें जो आपने देखा है\n(जमा करने के लिए Enter या स्पेस दबाएँ)",
        correct: "सही!\n(जारी रखने के लिए Enter या स्पेस दबाएँ)",
        incorrect: "गलत!\n(जारी रखने के लिए Enter या स्पेस दबाएँ)",
        sequencingInstruction:
          "कर्सर को स्थानांतरित करने के लिए दाईं ओर के तीर को दबाएँ\n(चयन करने के लिए Enter या स्पेसबार दबाएँ)",
        finish: "समाप्त!",
        continue: "जारी रखने के लिए स्पेसबार या Enter दबाएँ",
        findMatch: "मिलान करने वाला वर्ण खोजें",
        remaining: " शेष",
        guess: "प्रकट हो रहे वर्ण से मेल खाने वाली कुंजी दबाएँ",
      },

      parameter: {
        durationMin: "अवधि (मिनट)",
        stimuliType: "उत्तेजना प्रकार",
        stimuliLength: "उत्तेजना की लंबाई",
        presentationTime: "प्रस्तुति समय (सेकंड)",
        delayTime: "विलंब समय (सेकंड)",
        promptType: "प्रॉम्प्ट प्रकार",
        promptLength: "प्रॉम्प्ट की लंबाई",
        targetLength: "लक्ष्य की लंबाई",
        targetCount: "लक्ष्य की संख्या",
        chunkSize: "खंड आकार",
        Numbers: "संख्या",
        Alphabet: "वर्णमाला",
        Alphanumeric: "अल्फ़ान्यूमेरिक",
        Korean: "कोरियाई",
        Sequential: "क्रमानुसार",
        Random: "यादृच्छिक",
        Small: "छोटा",
        Medium: "मध्यम",
        Large: "बड़ा",
      },

      procedure: {
        "Rapid Visual Perception": "तेज़ दृश्य धारणा",
        "Sequential Visual Memory": "क्रमबद्ध दृश्य स्मृति",
        "Character Sequencing": "वर्ण क्रमबद्धता",
        "Character Matching": "वर्ण मिलान",
        "Character Guesstimate": "वर्ण अनुमान",
      },

      result: {
        date: "तारीख",
        trainer: "प्रशिक्षक",
        trainee: "प्रशिक्षणार्थी",
        trainingParameters: "प्रशिक्षण मापदंड",
        notesPlaceholder: "यहाँ अपने नोट्स लिखें...",
        title: "प्रशिक्षण परिणाम",
        noData: "कोई डेटा लोड नहीं हुआ",
        noDataDesc:
          "कृपया एक प्रशिक्षण परिणाम लोड करें या एक नया प्रशिक्षण प्रारंभ करें।",
        download: "परिणाम डाउनलोड करें",
        goTrain: "प्रशिक्षण के लिए जाएं",
        averageRevealed: "औसत प्रकट हुआ",
        averageRevealedDesc: "वर्ण के खंडों का औसत प्रतिशत",
        accuracy: "सटीकता",
        accuracyDesc: "सही प्रतिक्रियाओं का प्रतिशत",
        averageAccuracy: "औसत सटीकता",
        averageAccuracyDesc: "सभी परीक्षणों की औसत सटीकता",
        trials: "परीक्षण",
        trialsDesc: "सभी निष्पादित परीक्षणों का रिकॉर्ड",
        averageTrialTime: "औसत परीक्षण समय",
        averageTrialTimeDesc:
          "प्रत्येक परीक्षण पर खर्च किया गया औसत समय (सेकंड में)",
        elapsedTime: "बीता हुआ समय",
        elapsedTimeDesc: "प्रशिक्षण पर खर्च किया गया वास्तविक समय",
        trialCount: "परीक्षणों की संख्या",
        trialCountDesc: "निष्पादित परीक्षणों की संख्या",
        correctCount: "सही उत्तरों की संख्या",
        correctCountDesc: "सही प्रतिक्रियाओं की संख्या",
      },
    },
    ru: {
      landing: {
        title: "BlueScript",
        cta: "Начать тренировку",
        github: "Получить исходный код",
        description:
          "BlueScript — это некоммерческая организация, разрабатывающая бесплатные и открытые инструменты для помощи людям с дислексией.",
        features: {
          title: "Почему выбрать BlueScript?",
          description:
            "BlueScript — это некоммерческая организация, посвященная разработке бесплатных и открытых инструментов для поддержки людей с дислексией.",
          headline: "Основные особенности",
          items: {
            card1: {
              title: "Простой в использовании",
              description:
                "BlueScript интуитивно понятен для индивидуального использования, что позволяет людям с дислексией получать помощь с минимальной профессиональной поддержкой.",
            },
            card2: {
              title: "Всегда бесплатно",
              description:
                "BlueScript стремится к доступности, обеспечивая всем бесплатный доступ к основным инструментам поддержки дислексии.",
            },
            card3: {
              title: "Открытый исходный код",
              description:
                "BlueScript приветствует вклад каждого. Получите доступ к нашему исходному коду, чтобы свободно модифицировать, улучшать и внедрять инновации.",
            },
            card4: {
              title: "Приоритет конфиденциальности",
              description:
                "BlueScript ставит вашу конфиденциальность на первое место, не собирая никакой личной информации, сохраняя ваше фундаментальное право на конфиденциальность.",
            },
            card5: {
              title: "Полная доступность",
              description:
                "Используя новейшие веб-технологии, BlueScript разработан для обеспечения доступности на всех устройствах, что гарантирует инклюзивность для всех пользователей.",
            },
            card6: {
              title: "Научная обоснованность",
              description:
                "Методы тренировки BlueScript разработаны и проверены экспертами с более чем двадцатилетним опытом исследований в области дислексии.",
            },
          },
        },
      },
      nav: {
        home: "Главная",
        train: "Тренировка",
        result: "Результат",
      },
      unit: {
        sec: "с",
        min: "м",
      },
      train: {
        title: "Настроить тренировку",
        start: "Начать тренировку",
      },
      training: {
        ready: "Готовьтесь!",
        trial: "Испытание",
        timeSpent: "Время потрачено:",
        accuracy: "Точность:",
        elapsed: "Прошло времени:",
        typeAnswer:
          "Пожалуйста, введите символы, которые вы видели\n(нажмите Enter или пробел для отправки)",
        correct: "Правильно!\n(нажмите Enter или пробел для продолжения)",
        incorrect: "Неправильно!\n(нажмите Enter или пробел для продолжения)",
        sequencingInstruction:
          "Нажмите стрелку вправо, чтобы переместить курсор\n(нажмите Enter или пробел для выбора)",
        finish: "Завершено!",
        continue: "Нажмите пробел или Enter для продолжения",
        findMatch: "Найдите соответствующий символ",
        remaining: " осталось",
        guess: "Нажмите клавишу, соответствующую отображаемому символу",
      },

      parameter: {
        durationMin: "Длительность (мин)",
        stimuliType: "Тип стимула",
        stimuliLength: "Длина стимула",
        presentationTime: "Время показа (с)",
        delayTime: "Время задержки (с)",
        promptType: "Тип подсказки",
        promptLength: "Длина подсказки",
        targetLength: "Длина цели",
        targetCount: "Количество целей",
        chunkSize: "Размер блока",
        Numbers: "Числа",
        Alphabet: "Алфавит",
        Alphanumeric: "Буквенно-цифровой",
        Korean: "Корейский",
        Sequential: "Последовательный",
        Random: "Случайный",
        Small: "Маленький",
        Medium: "Средний",
        Large: "Большой",
      },

      procedure: {
        "Rapid Visual Perception": "Быстрое визуальное восприятие",
        "Sequential Visual Memory": "Последовательная зрительная память",
        "Character Sequencing": "Последовательность символов",
        "Character Matching": "Соответствие символов",
        "Character Guesstimate": "Предположение символов",
      },

      result: {
        date: "Дата",
        trainer: "Тренер",
        trainee: "Тренируемый",
        trainingParameters: "Параметры тренировки",
        notesPlaceholder: "Напишите свои заметки здесь...",
        title: "Результат тренировки",
        noData: "Данные не загружены",
        noDataDesc:
          "Пожалуйста, загрузите результат тренировки или начните новую тренировку.",
        download: "Скачать результат",
        goTrain: "Перейти к тренировке",
        averageRevealed: "Среднее раскрытие",
        averageRevealedDesc: "Средний процент раскрытых блоков символа",
        accuracy: "Точность",
        accuracyDesc: "Процент правильных ответов",
        averageAccuracy: "Средняя точность",
        averageAccuracyDesc: "Средняя точность всех испытаний",
        trials: "Испытания",
        trialsDesc: "Запись всех проведенных испытаний",
        averageTrialTime: "Среднее время испытания",
        averageTrialTimeDesc:
          "Среднее время, затраченное на каждое испытание (в секундах)",
        elapsedTime: "Прошло времени",
        elapsedTimeDesc: "Фактическое время, затраченное на тренировку",
        trialCount: "Количество испытаний",
        trialCountDesc: "Количество проведенных испытаний",
        correctCount: "Количество правильных ответов",
        correctCountDesc: "Количество правильных ответов",
      },
    },
  },
}));
