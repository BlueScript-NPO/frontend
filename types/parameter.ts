export abstract class Parameter {
  displayName: string;
  jsonKey: string;

  constructor(displayName: string, jsonKey: string) {
    this.displayName = displayName;
    this.jsonKey = jsonKey;
  }

  toJson(): any {
    return { [this.jsonKey]: this.getValue() };
  }

  abstract getValue(): any;
}

export class SelectParameter<T> extends Parameter {
  options: T[];
  selected: T;

  constructor(
    displayName: string,
    jsonKey: string,
    options: T[],
    selectedIndex?: number
  ) {
    if (options.length === 0) {
      throw new Error("options cannot be empty");
    }
    super(displayName, jsonKey);
    this.options = options;
    this.selected =
      selectedIndex !== undefined ? options[selectedIndex] : options[0];
  }

  getValue(): T {
    return this.selected;
  }
}

export class NumParameter extends Parameter {
  value: number;
  min?: number;
  max?: number;
  step?: number;

  constructor(
    displayName: string,
    jsonKey: string,
    value: number,
    min?: number,
    max?: number,
    step?: number
  ) {
    if (min !== undefined && max !== undefined && min > max) {
      throw new Error("min cannot be greater than max");
    }
    if (step !== undefined && min !== undefined && max !== undefined) {
      if (step > max - min) {
        throw new Error("step cannot be greater than max - min");
      }
    }
    if (min !== undefined && value < min) {
      throw new Error("value cannot be less than min");
    }
    if (step !== undefined && min !== undefined && max !== undefined) {
      if ((value - min) % step !== 0) {
        throw new Error("value must be in the step");
      }
    }

    super(displayName, jsonKey);
    this.value = value;
    this.min = min;
    this.max = max;
    this.step = step;
  }

  getValue(): number {
    return this.value;
  }
}

export class BoolParameter extends Parameter {
  value: boolean;

  constructor(displayName: string, jsonKey: string, value: boolean) {
    super(displayName, jsonKey);
    this.value = value;
  }

  getValue(): boolean {
    return this.value;
  }
}

export class StimuliTypeParameter extends SelectParameter<string> {
  constructor(selected?: string) {
    const stimuli: string[] = ["Numbers", "Alphabet", "Alphanumeric", "Korean"];
    if (selected && !stimuli.includes(selected)) {
      throw new Error("Invalid stimuli type");
    }
    super(
      "Stimuli Type",
      "stimuliType",
      stimuli,
      selected ? stimuli.indexOf(selected) : undefined
    );
  }
}

export class StimuliLengthParameter extends NumParameter {
  constructor(value: number = 1) {
    super("Stimuli Length", "stimuliLength", value, 1, 6, 1);
  }
}
