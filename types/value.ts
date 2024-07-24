// value class
export abstract class Value {
  displayName: string;
  description?: string;
  jsonKey: string;
  type: string;

  constructor(
    displayName: string,
    jsonKey: string,
    description?: string,
    type: string = "value"
  ) {
    this.displayName = displayName;
    this.jsonKey = jsonKey;
    this.description = description;
    this.type = type;
  }

  toJson(): any {
    return { [this.jsonKey]: this.getValue() };
  }

  abstract getValue(): any;
}

export class PercentageValue extends Value {
  value: number;

  constructor(
    displayName: string,
    jsonKey: string,
    description: string,
    value: number
  ) {
    super(displayName, jsonKey, description, "percentage");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class ComputedPercentageValue extends Value {
  value: number;
  total: number;
  counted: number;

  constructor(
    displayName: string,
    jsonKey: string,
    description: string,
    total: number,
    counted: number
  ) {
    super(displayName, jsonKey, description, "ComputedPercentage");
    this.total = total;
    this.counted = counted;
    // round to 2 decimal places
    this.value = Math.round((counted / total) * 100 * 100) / 100;
  }

  getValue(): any {
    return {
      total: this.total,
      counted: this.counted,
    };
  }

  getPercentage(): number {
    return this.value;
  }

  getTotal(): number {
    return this.total;
  }

  getCounted(): number {
    return this.counted;
  }
}

export class AverageRevealedValue extends PercentageValue {
  constructor(value: number) {
    super(
      "result.averageRevealed",
      "averageRevealed",
      "result.averageRevealedDesc",
      value
    );
  }
}

export class PercentAccuracyValue extends ComputedPercentageValue {
  constructor(value: { total: number; counted: number }) {
    super(
      "result.accuracy",
      "accuracy",
      "result.accuracyDesc",
      value.total,
      value.counted
    );
  }
}

export class AccuracyValue extends PercentageValue {
  constructor(value: number) {
    super("result.accuracy", "accuracy", "result.accuracyDesc", value);
  }
}

export class AverageAccuracyValue extends PercentageValue {
  constructor(value: number) {
    super(
      "result.averageAccuracy",
      "averageAccuracy",
      "result.averageAccuracyDesc",
      value
    );
  }
}

export class TableValue extends Value {
  value: any[];

  constructor(
    displayName: string,
    jsonKey: string,
    description?: string,
    value: any[] = []
  ) {
    super(displayName, jsonKey, description, "table");
    this.value = value;
  }

  getValue(): any {
    return this.value;
  }
}

export class TrialsTableValue extends TableValue {
  constructor(value: any[], columns?: string[]) {
    super("result.trials", "trials", "result.trialsDesc", value);
    this.value = value;
  }
}

export class AverageTrialTime extends Value {
  value: number;

  constructor(value: number) {
    super(
      "result.averageTrialTime",
      "averageTrialTime",
      "result.averageTrialTimeDesc",
      "time"
    );
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class ElapsedTime extends Value {
  value: number;

  constructor(value: number) {
    super(
      "result.elapsedTime",
      "elapsedTime",
      "result.elapsedTimeDesc",
      "time"
    );
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class TrialCount extends Value {
  value: number;

  constructor(value: number) {
    super("result.trialCount", "trialCount", "result.trialCountDesc");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}

export class CorrectCount extends Value {
  value: number;

  constructor(value: number) {
    super("result.correctCount", "correctCount", "result.correctCountDesc");
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }
}
