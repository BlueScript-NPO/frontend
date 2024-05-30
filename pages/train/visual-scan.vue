<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";

interface ValidParams {
  "target-type": string[];
  "target-count": number;
  "char-count": number;
  "target-size": string[];
  "trial-count": number;
}

interface DefaultParams {
  "target-type": string;
  "target-count": number;
  "char-count": number;
  "target-size": string;
  "trial-count": number;
}

interface Params {
  "target-type": string;
  "target-count": number;
  "char-count": number;
  "target-size": string;
  "trial-count": number;
}

const route = useRoute();
const unprocessedParams = route.query;

const paramNames: (keyof ValidParams)[] = [
  "target-type",
  "target-count",
  "char-count",
  "target-size",
  "trial-count",
];

const validParams: ValidParams = {
  "target-type": ["num", "upper", "lower", "symbol"],
  "target-count": 1,
  "char-count": 10,
  "target-size": ["big", "small"],
  "trial-count": 3,
};

const defaultParams: DefaultParams = {
  "target-type": "num",
  "target-count": 1,
  "char-count": 10,
  "target-size": "big",
  "trial-count": 3,
};

const params = ref<Params>({
  "target-type": defaultParams["target-type"],
  "target-count": defaultParams["target-count"],
  "char-count": defaultParams["char-count"],
  "target-size": defaultParams["target-size"],
  "trial-count": defaultParams["trial-count"],
});

function handleParam(paramName: keyof ValidParams): string | number {
  const paramValue = unprocessedParams[paramName];

  if (typeof validParams[paramName] === "number") {
    const parsedValue = parseInt(paramValue as string);
    return Number.isInteger(parsedValue)
      ? parsedValue
      : defaultParams[paramName];
  }

  if (Array.isArray(validParams[paramName]) && typeof paramValue === "string") {
    return validParams[paramName].includes(paramValue)
      ? paramValue
      : defaultParams[paramName];
  }

  return defaultParams[paramName];
}

paramNames.forEach((paramName) => {
  params.value[paramName] = handleParam(paramName);
});
</script>

<template>
  <div>
    <h1>Unprocessed Params: {{ unprocessedParams }}</h1>
    <h1>Processed Params: {{ params }}</h1>
  </div>
</template>
