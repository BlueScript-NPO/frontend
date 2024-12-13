<script lang="ts" setup>
const characterPool = ref("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const promptLength = ref(14);
const answerChoiceCount = ref(16 * Math.ceil(promptLength.value / 3));

const mainText = ref("");
const subText = ref("");
const prompt = ref("");
const currentTrainingStep = ref(0);
const cursorIndex = ref(0);
const answerChoices = ref<string[]>([]);
const correctIndices = ref<number[]>([]);
const selectedIndices = ref(new Set<number>());
const missedCount = ref(0);
const correctCount = ref(0);
const lastCorrectIndex = ref(-1);
const currentTrialCount = ref(1);

const { t } = useI18n();

const accuracy = computed(() => {
  const total = correctCount.value + missedCount.value;
  return total === 0 ? 0 : (correctCount.value / total) * 100;
});

const waitForMilliseconds = (ms: number) =>
  new Promise((r) => setTimeout(r, ms));

const getRandomChar = (exclude: string | null) => {
  let ch;
  do {
    ch =
      characterPool.value[
        Math.floor(Math.random() * characterPool.value.length)
      ];
  } while (ch === exclude);
  return ch;
};

const generatePrompt = () => {
  let result = "";
  for (let i = 0; i < promptLength.value; i++) {
    result +=
      characterPool.value[
        Math.floor(Math.random() * characterPool.value.length)
      ];
  }
  return result;
};

const simulateSelections = async () => {
  while (cursorIndex.value < answerChoiceCount.value) {
    await waitForMilliseconds(Math.random() * 100 + 150);
    if (correctIndices.value.includes(cursorIndex.value)) {
      if (Math.random() < 0.95) {
        selectedIndices.value.add(cursorIndex.value);
        correctCount.value++;
        lastCorrectIndex.value = cursorIndex.value;
        cursorIndex.value++;
      } else {
        missedCount.value++;
        cursorIndex.value = lastCorrectIndex.value + 1;
        await waitForMilliseconds(Math.random() * 1200 + 600);
      }
    } else {
      if (Math.random() < 0.05) {
        missedCount.value++;
        cursorIndex.value = lastCorrectIndex.value + 1;
        await waitForMilliseconds(Math.random() * 1200 + 600);
      } else {
        cursorIndex.value++;
      }
    }
  }

  currentTrialCount.value++;
  currentTrainingStep.value = 3;
  mainText.value = t("training.finish");
  subText.value = `${t("training.accuracy")} ${accuracy.value.toFixed(2)}%`;

  await waitForMilliseconds(2000);
  currentTrainingStep.value = 1;
  mainText.value = t("training.ready");
  subText.value = `${t("training.trial")} #${currentTrialCount.value}`;

  await waitForMilliseconds(1000);
  for (let i = 3; i > 0; i--) {
    mainText.value = i.toString();
    await waitForMilliseconds(1000);
  }

  currentTrainingStep.value = 2;
  mainText.value = "";
  subText.value = "";
};

const simulateTrial = async () => {
  prompt.value = generatePrompt();
  cursorIndex.value = 0;
  missedCount.value = 0;
  correctCount.value = 0;
  lastCorrectIndex.value = -1;
  selectedIndices.value.clear();

  const len = prompt.value.length;
  const used = new Set<number>();
  const indices: number[] = [];

  while (indices.length < len) {
    const idx = Math.floor(Math.random() * answerChoiceCount.value);
    if (!used.has(idx)) {
      used.add(idx);
      indices.push(idx);
    }
  }

  indices.sort((a, b) => a - b);
  answerChoices.value = Array(answerChoiceCount.value).fill(" ");
  indices.forEach((x, i) => (answerChoices.value[x] = prompt.value[i]));

  for (let i = 0; i < answerChoices.value.length; i++) {
    if (answerChoices.value[i] === " ") {
      const nx = indices.find((idx) => idx > i);
      answerChoices.value[i] = getRandomChar(
        nx !== undefined ? prompt.value[indices.indexOf(nx)] : null
      );
    }
  }

  correctIndices.value = indices;
  currentTrainingStep.value = 2;
  mainText.value = "";
  subText.value = "";

  await simulateSelections();
  simulateTrial();
};

onMounted(() => {
  simulateTrial();
});
</script>

<template>
  <div class="overflow-hidden bg-zinc-50 dark:bg-zinc-950 w-full h-full p-4">
    <div
      v-if="currentTrainingStep === 1 || currentTrainingStep === 3"
      class="flex flex-col justify-center items-center h-full space-y-10"
    >
      <TitleHud :title="mainText" :subtitle="subText" />
    </div>

    <div
      v-if="currentTrainingStep === 2"
      class="flex flex-col justify-center items-center h-full training-text"
    >
      <div class="flex">
        <div v-for="(ch, i) in prompt" :key="i" class="flex justify-center w-8">
          <span class="block text-center text-4xl">{{ ch }}</span>
        </div>
      </div>

      <UDivider class="pt-4 pb-10" />

      <div class="flex justify-center">
        <div class="grid grid-cols-16">
          <div
            v-for="(ch, i) in answerChoices"
            :key="i"
            :id="'choice-' + i"
            :class="[
              'w-14 h-16 rounded-md flex justify-center items-center',
              {
                'outline-blueScriptBlue-500 dark:outline-blueScriptBlue-400 outline outline-2':
                  i === cursorIndex,
                'text-green-500 dark:text-green-400': selectedIndices.has(i),
              },
            ]"
          >
            <span class="block text-center text-5xl w-full">{{ ch }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
