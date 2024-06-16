import {
  Parameter,
  NumParameter,
  StimuliLengthParameter,
  StimuliTypeParameter,
} from "./parameter";

export abstract class Procedure {
  name: string;
  duration: NumParameter;
  parameters: Parameter[] = [];

  constructor(name: string, duration: number = 10) {
    this.name = name;
    this.duration = new NumParameter(
      "Duration (s)",
      "duration",
      duration,
      10,
      3600,
      10
    );
    this.parameters.push(this.duration);
  }

  toJson(): any {
    const parametersJson = this.parameters.reduce((acc, param) => {
      return { ...acc, ...param.toJson() };
    }, {});
    return {
      procedure: this.name,
      parameters: parametersJson,
    };
  }

  // check if all the parameters are valid and exist in json
  validateParameters(json: any): boolean {
    for (const param of this.parameters) {
      if (!json.parameters.hasOwnProperty(param.jsonKey)) {
        return false;
      }
    }
    return true;
  }
}

export class TachistoscopeProcedure extends Procedure {
  stimuliType: StimuliTypeParameter;
  stimuliLength: StimuliLengthParameter;
  presentationTime: NumParameter;

  constructor(
    duration?: number,
    stimuliType?: string,
    stimuliLength: number = 1,
    presentationTime: number = 0.25
  ) {
    super("Tachistoscope", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.stimuliLength = new StimuliLengthParameter(stimuliLength);
    this.presentationTime = new NumParameter(
      "Presentation Time (s)",
      "presentationTime",
      presentationTime,
      0.05,
      1.0,
      0.05
    );

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.stimuliLength);
    this.parameters.push(this.presentationTime);
  }
}

export class VisualSpanProcedure extends Procedure {
  delayTime: NumParameter;
  stimuliType: StimuliTypeParameter;
  stimuliLength: StimuliLengthParameter;

  constructor(
    duration?: number,
    delayTime: number = 1,
    stimuliType?: string,
    stimuliLength: number = 1
  ) {
    super("Visual Span", duration);
    this.delayTime = new NumParameter(
      "delay Time (s)",
      "delayTime",
      delayTime,
      0,
      10,
      1
    );

    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.stimuliLength = new StimuliLengthParameter(stimuliLength);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.stimuliLength);
    this.parameters.push(this.delayTime);
  }
}

// function to convert json procedure to Procedure object
export function jsonToProcedure(json: any): Procedure {
  if (json.procedure === "Tachistoscope") {
    return new TachistoscopeProcedure(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.stimuliLength,
      json.parameters.presentationTime
    );
  } else if (json.procedure === "Visual Span") {
    return new VisualSpanProcedure(
      json.parameters.duration,
      json.parameters.delayTime,
      json.parameters.stimuliType,
      json.parameters.stimuliLength
    );
  } else {
    throw new Error("Invalid procedure type");
  }
}
