export interface Parameter {
  type: string;
  value: any;
  options?: any[];
  min?: number;
  max?: number;
  step?: number;
}

export class StimuliTypeParameter implements Parameter {
  type = "select";
  value = "Numbers";
  options = ["Numbers", "Upper Case Letters", "Lower Case Letters", "Codes"];

  static fromJSON(json: any): StimuliTypeParameter {
    const param = new StimuliTypeParameter();
    param.value = json.value;
    return param;
  }
}

export class StimuliSizeParameter implements Parameter {
  type = "select";
  value = "Small";
  options = ["Small", "Medium", "Large"];

  static fromJSON(json: any): StimuliSizeParameter {
    const param = new StimuliSizeParameter();
    param.value = json.value;
    return param;
  }
}

export class ArrayCharCountParameter implements Parameter {
  type = "number";
  value = 50;
  options = [50, 75, 100, 140, 175, 200, 250, 275, 300];

  static fromJSON(json: any): ArrayCharCountParameter {
    const param = new ArrayCharCountParameter();
    param.value = json.value;
    return param;
  }
}

export class NumParameter implements Parameter {
  type = "number";
  value: number;
  min: number;
  max: number;
  step: number;

  constructor(min: number, max: number, step: number, defaultValue?: number) {
    this.value = defaultValue !== undefined ? defaultValue : min;
    this.min = min;
    this.max = max;
    this.step = step;
  }

  static fromJSON(json: any): NumParameter {
    return new NumParameter(json.min, json.max, json.step, json.value);
  }
}

export interface Procedure {
  name: string;
  parameters: { key: string; label: string; parameter: Parameter }[];
  validateParameters(data: any): boolean;
  toJSON(): string;
}

abstract class BaseProcedure implements Procedure {
  name: string;
  parameters: { key: string; label: string; parameter: Parameter }[];

  constructor(
    name: string,
    parameters: { key: string; label: string; parameter: Parameter }[]
  ) {
    this.name = name;
    this.parameters = parameters;
  }

  validateParameters(data: any): boolean {
    for (const param of this.parameters) {
      if (param.parameter.type === "select" && !data[param.key]) {
        return false;
      }
      if (param.parameter.type === "number") {
        const value = data[param.key];
        if (
          value === null ||
          value === undefined ||
          value < param.parameter.min ||
          value > param.parameter.max
        ) {
          return false;
        }
      }
    }
    return true;
  }

  toJSON(): string {
    const data = this.parameters.reduce((acc, { key, parameter }) => {
      acc[key] = parameter.value;
      return acc;
    }, {} as Record<string, any>);
    return JSON.stringify(data);
  }

  static fromJSON(json: any, procedureType: new () => Procedure): Procedure {
    const procedure = new procedureType();
    procedure.parameters = json.parameters.map((param: any) => ({
      key: param.key,
      label: param.label,
      parameter: convertParameterFromJSON(param.parameter),
    }));
    return procedure;
  }
}

export class TachistoscopeProcedure extends BaseProcedure {
  constructor() {
    super("Tachistoscope", [
      {
        key: "stimuliType",
        label: "Stimuli Type",
        parameter: new StimuliTypeParameter(),
      },
      {
        key: "stimuliSize",
        label: "Stimuli Size",
        parameter: new StimuliSizeParameter(),
      },
      {
        key: "presentationTime",
        label: "Presentation Time (seconds)",
        parameter: new NumParameter(0.1, 5.0, 0.05),
      },
      {
        key: "delayTime",
        label: "Delay Time (seconds)",
        parameter: new NumParameter(0, 10, 1),
      },
      {
        key: "stimuliLength",
        label: "Stimuli Length",
        parameter: new NumParameter(1, 6, 1),
      },
      {
        key: "trainingTime",
        label: "Training Time (seconds)",
        parameter: new NumParameter(60, 600, 10),
      },
    ]);
  }
}

export class VisualSpanProcedure extends BaseProcedure {
  constructor() {
    super("Visual Span", [
      {
        key: "stimuliType",
        label: "Stimuli Type",
        parameter: new StimuliTypeParameter(),
      },
      {
        key: "stimuliSize",
        label: "Stimuli Size",
        parameter: new StimuliSizeParameter(),
      },
      {
        key: "delayTime",
        label: "Delay Time (seconds)",
        parameter: new NumParameter(0, 10, 1),
      },
      {
        key: "stimuliLength",
        label: "Stimuli Length",
        parameter: new NumParameter(1, 6, 1),
      },
      {
        key: "trainingTime",
        label: "Training Time (seconds)",
        parameter: new NumParameter(60, 600, 10),
      },
    ]);
  }
}

export class VisualScanProcedure extends BaseProcedure {
  constructor() {
    super("Visual Scan", [
      {
        key: "targetCount",
        label: "Target Count",
        parameter: new NumParameter(5, 25, 1),
      },
      {
        key: "trainingTime",
        label: "Training Time (seconds)",
        parameter: new NumParameter(60, 600, 10),
      },
      {
        key: "arrayCharCount",
        label: "Array Character Count",
        parameter: new ArrayCharCountParameter(),
      },
      {
        key: "targetType",
        label: "Target Type",
        parameter: new StimuliTypeParameter(),
      },
      {
        key: "arrayType",
        label: "Array Type",
        parameter: new StimuliTypeParameter(),
      },
    ]);
  }
}

function convertParameterFromJSON(json: any): Parameter {
  switch (json.type) {
    case "select":
      if (json.options.includes("Numbers")) {
        return StimuliTypeParameter.fromJSON(json);
      } else if (json.options.includes("Small")) {
        return StimuliSizeParameter.fromJSON(json);
      }
      return json; // fallback if necessary
    case "number":
      if (json.options) {
        return ArrayCharCountParameter.fromJSON(json);
      } else {
        return NumParameter.fromJSON(json);
      }
    default:
      throw new Error(`Unknown parameter type: ${json.type}`);
  }
}
