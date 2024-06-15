export interface Parameter {
  type: string;
  value: any;
  options?: any[];
  min?: number;
  max?: number;
  step?: number;
}

export abstract class BaseParameter implements Parameter {
  type: string;
  value: any;
  options?: any[];
  min?: number;
  max?: number;
  step?: number;

  protected constructor(
    type: string,
    value: any,
    options?: any[],
    min?: number,
    max?: number,
    step?: number
  ) {
    this.type = type;
    this.value = value;
    this.options = options;
    this.min = min;
    this.max = max;
    this.step = step;
  }

  static fromJSON(json: any): Parameter {
    switch (json.type) {
      case "select":
        return new StimuliTypeParameter(json.value);
      case "number":
        return json.options
          ? new ArrayCharCountParameter(json.value)
          : new NumParameter(json.min, json.max, json.step, json.value);
      default:
        throw new Error(`Unknown parameter type: ${json.type}`);
    }
  }
}

export class StimuliTypeParameter extends BaseParameter {
  constructor(value: string = "Numbers") {
    super("select", value, [
      "Numbers",
      "Alphabet",
      "Codes (Alphanumeric)",
      "Korean Alphabet",
    ]);
  }
}

export class ArrayCharCountParameter extends BaseParameter {
  constructor(value: number = 50) {
    super("number", value, [50, 75, 100, 140, 175, 200, 250, 275, 300]);
  }
}

export class NumParameter extends BaseParameter {
  constructor(min: number, max: number, step: number, value?: number) {
    super(
      "number",
      value !== undefined ? value : min,
      undefined,
      min,
      max,
      step
    );
  }
}

export interface Procedure {
  name: string;
  parameters: { key: string; label: string; parameter: Parameter }[];
  validateParameters(data: any): boolean;
  toJSON(): any;
  getMetadata(): any;
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
      const value = data[param.key];
      if (param.parameter.type === "select" && !value) {
        return false;
      }
      if (param.parameter.type === "number") {
        if (
          value === null ||
          value === undefined ||
          (param.parameter.min !== undefined && value < param.parameter.min) ||
          (param.parameter.max !== undefined && value > param.parameter.max)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  toJSON(): any {
    return this.parameters.reduce((acc, { key, parameter }) => {
      acc[key] = parameter.value;
      return acc;
    }, {} as Record<string, any>);
  }

  getMetadata(): any {
    return this.parameters.reduce((acc, { key, label, parameter }) => {
      acc[key] = { label, ...parameter };
      return acc;
    }, {} as Record<string, any>);
  }

  static fromJSON(json: any, procedureType: new () => Procedure): Procedure {
    const procedure = new procedureType();
    procedure.parameters = Object.entries(json).map(
      ([key, value]: [string, any]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        parameter: BaseParameter.fromJSON({
          type: typeof value === "string" ? "select" : "number",
          value,
        }),
      })
    );
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
        key: "presentationTime",
        label: "Presentation Time (seconds)",
        parameter: new NumParameter(0.1, 5.0, 0.05),
      },
      {
        key: "stimuliLength",
        label: "Stimuli Length",
        parameter: new NumParameter(1, 6, 1),
      },
      {
        key: "trainingTime",
        label: "Training Time (seconds)",
        parameter: new NumParameter(10, 600, 10),
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
        parameter: new NumParameter(10, 600, 10),
      },
    ]);
  }
}

export interface TrainingResult {
  date: Date;
  duration: number;
  patientId: string;
  doctorId: string;
  procedureParameters: Procedure;
  procedureResults: any;
  validateParameters(data: any): boolean;
  toJSON(): any;
  getMetadata(): any;
}

abstract class BaseTrainingResult implements TrainingResult {
  date: Date;
  duration: number;
  patientId: string;
  doctorId: string;
  procedureParameters: Procedure;
  procedureResults: any;

  constructor(
    procedureType: new () => Procedure,
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string
  ) {
    this.procedureParameters = new procedureType();
    this.date = date;
    this.duration = duration;
    this.patientId = patientId;
    this.doctorId = doctorId;
  }

  validateParameters(data: any): boolean {
    return this.procedureParameters.validateParameters(data);
  }

  toJSON(): any {
    return {
      procedureName: this.procedureParameters.name,
      date: this.date,
      duration: this.duration,
      patientId: this.patientId,
      doctorId: this.doctorId,
      result: this.procedureResults,
      procedureParameters: this.procedureParameters.toJSON(),
    };
  }

  getMetadata(): any {
    return {
      procedureName: this.procedureParameters.name,
      parameters: this.procedureParameters.getMetadata(),
    };
  }

  static createInstance(
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string,
    procedureParameters: Procedure,
    procedureResults: any
  ): BaseTrainingResult {
    throw new Error("Method not implemented.");
  }

  static fromJSON(
    json: any,
    trainingResultType: typeof BaseTrainingResult
  ): TrainingResult {
    const procedureType = getProcedureType(json.procedureName); // Dynamically get the procedure type
    const procedureParameters = BaseProcedure.fromJSON(
      json.procedureParameters,
      procedureType
    );
    return trainingResultType.createInstance(
      new Date(json.date),
      json.duration,
      json.patientId,
      json.doctorId,
      procedureParameters,
      json.result
    );
  }
}

export class TachistoscopeTrainingResult extends BaseTrainingResult {
  accuracy: number;
  trialCount: number;

  constructor(
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string,
    accuracy: number,
    trialCount: number,
    procedureParameters: TachistoscopeProcedure
  ) {
    super(TachistoscopeProcedure, date, duration, patientId, doctorId);
    this.accuracy = accuracy;
    this.trialCount = trialCount;
    this.procedureResults = { accuracy, trialCount };
    this.procedureParameters = procedureParameters;
  }

  static createInstance(
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string,
    procedureParameters: Procedure,
    procedureResults: any
  ): TachistoscopeTrainingResult {
    return new TachistoscopeTrainingResult(
      date,
      duration,
      patientId,
      doctorId,
      procedureResults.accuracy,
      procedureResults.trialCount,
      procedureParameters as TachistoscopeProcedure
    );
  }

  static fromJSON(json: any): TachistoscopeTrainingResult {
    const procedureParameters = BaseProcedure.fromJSON(
      json.procedureParameters,
      TachistoscopeProcedure
    );
    return new TachistoscopeTrainingResult(
      new Date(json.date),
      json.duration,
      json.patientId,
      json.doctorId,
      json.result.accuracy,
      json.result.trialCount,
      procedureParameters as TachistoscopeProcedure
    );
  }
}

export class VisualSpanTrainingResult extends BaseTrainingResult {
  accuracy: number;
  trialCount: number;

  constructor(
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string,
    accuracy: number,
    trialCount: number,
    procedureParameters: VisualSpanProcedure
  ) {
    super(VisualSpanProcedure, date, duration, patientId, doctorId);
    this.accuracy = accuracy;
    this.trialCount = trialCount;
    this.procedureResults = { accuracy, trialCount };
    this.procedureParameters = procedureParameters;
  }

  static createInstance(
    date: Date,
    duration: number,
    patientId: string,
    doctorId: string,
    procedureParameters: Procedure,
    procedureResults: any
  ): VisualSpanTrainingResult {
    return new VisualSpanTrainingResult(
      date,
      duration,
      patientId,
      doctorId,
      procedureResults.accuracy,
      procedureResults.trialCount,
      procedureParameters
    );
  }

  static fromJSON(json: any): VisualSpanTrainingResult {
    const procedureParameters = BaseProcedure.fromJSON(
      json.procedureParameters,
      VisualSpanProcedure
    );
    return new VisualSpanTrainingResult(
      new Date(json.date),
      json.duration,
      json.patientId,
      json.doctorId,
      json.result.accuracy,
      json.result.trialCount,
      procedureParameters
    );
  }
}

// Utility function to get the procedure type dynamically
function getProcedureType(procedureName: string): new () => Procedure {
  switch (procedureName) {
    case "Tachistoscope":
      return TachistoscopeProcedure;
    case "Visual Span":
      return VisualSpanProcedure;
    default:
      throw new Error(`Unknown procedure name: ${procedureName}`);
  }
}
