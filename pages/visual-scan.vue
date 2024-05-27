<!--
PARAMETERS!!!
target-type= num / upper / lower / symbol // default = num
target-count= (Integer) // default = 1
char-count= (Integer) // default = 10
target-size= big/small // default = big
trial-count= (Integer) // default = 3
 -->

<script setup>
const route = useRoute();
const unprocessedParams = route.query;

const paramNames = [
    "target-type",
    "target-count",
    "char-count",
    "target-size",
    "trial-count",
];

const validParams = {
    "target-type": ["num", "upper", "lower", "symbol"],
    "target-count": "Number",
    "char-count": "Number",
    "target-size": ["big", "small"],
    "trial-count": "Number",
};

const defaultParams = {
    "target-type": "num",
    "target-count": "1",
    "char-count": "10",
    "target-size": "big",
    "trial-count": "3",
};

const params = {
    "target-type": "",
    "target-count": "",
    "char-count": "",
    "target-size": "",
    "trial-count": "",
};

function handleParam(paramName) {
    const paramValue = unprocessedParams[paramName];

    // For number parameters
    if (validParams[paramName] == "Number") {
        return Number.isInteger(Number(paramValue))
            ? paramValue
            : defaultParams[paramName];
    }

    // For all other parameters
    return validParams[paramName].includes(paramValue)
        ? paramValue
        : defaultParams[paramName];
}

paramNames.forEach((paramName) => {
    params[paramName] = handleParam(paramName);
});
</script>

<template>
    <h1>{{ unprocessedParams }}</h1>
    <h1>{{ params }}</h1>
</template>
