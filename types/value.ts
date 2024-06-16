// value class
export abstract class Value {
  displayName: string;
  jsonKey: string;
  description?: string;

  constructor(displayName: string, jsonKey: string, description?: string) {
    this.displayName = displayName;
    this.jsonKey = jsonKey;
    this.description = description;
  }

  toJson(): any {
    return { [this.jsonKey]: this.getValue() };
  }

  abstract getValue(): any;
}

export class AccuracyValue extends Value {
  value: number;

  constructor(value: number) {
    super("Accuracy", "accuracy", "Percentage of correct responses");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class ElepsedTime extends Value {
  value: number;

  constructor(value: number) {
    super("Elepsed Time", "elepsedTime", "Time spent on training");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class TrialCount extends Value {
  value: number;

  constructor(value: number) {
    super("Trial Count", "trialCount", "Number of trials performed");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
