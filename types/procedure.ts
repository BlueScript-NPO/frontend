import {
  Parameter,
  NumParameter,
  StimuliLengthParameter,
  StimuliTypeParameter,
  PromptTypeParamter,
  PromptLengthParameter,
} from "./parameter";

export abstract class Procedure {
  name: string;
  duration: NumParameter;
  parameters: Parameter[] = [];

  constructor(name: string, duration: number = 5) {
    this.name = name;
    this.duration = new NumParameter(
      "Duration (minute)",
      "duration",
      duration,
      1,
      15,
      1
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

export class RapidVisualPerception extends Procedure {
  stimuliType: StimuliTypeParameter;
  stimuliLength: StimuliLengthParameter;
  presentationTime: NumParameter;

  constructor(
    duration?: number,
    stimuliType?: string,
    stimuliLength: number = 1,
    presentationTime: number = 0.25
  ) {
    super("Rapid Visual Perception", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.stimuliLength = new StimuliLengthParameter(stimuliLength);
    this.presentationTime = new NumParameter(
      "Presentation Time (seconds)",
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

export class SequentialVisualMemoryProcedure extends Procedure {
  delayTime: NumParameter;
  stimuliType: StimuliTypeParameter;
  stimuliLength: StimuliLengthParameter;

  constructor(
    duration?: number,
    delayTime: number = 10,
    stimuliType?: string,
    stimuliLength: number = 1
  ) {
    super("Sequential Visual Memory", duration);
    this.delayTime = new NumParameter(
      "Delay Time (seconds)", // will change to minute
      "delayTime",
      delayTime,
      0,
      25,
      1
    );

    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.stimuliLength = new StimuliLengthParameter(stimuliLength);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.stimuliLength);
    this.parameters.push(this.delayTime);
  }
}

export class CharactorSequenceingProcedure extends Procedure {
  stimuliType: StimuliTypeParameter;
  promptType: PromptTypeParamter;
  promptLength: PromptLengthParameter;

  constructor(
    duration?: number,
    stimuliType?: string,
    promptType?: string,
    promptLength: number = 16
  ) {
    super("Charactor Sequenceing", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.promptType = new PromptTypeParamter(promptType);
    this.promptLength = new PromptLengthParameter(promptLength);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.promptType);
    this.parameters.push(this.promptLength);
  }
}

// function to convert json procedure to Procedure object
export function jsonToProcedure(json: any): Procedure {
  if (json.procedure === "Rapid Visual Perception") {
    return new RapidVisualPerception(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.stimuliLength,
      json.parameters.presentationTime
    );
  } else if (json.procedure === "Sequential Visual Memory") {
    return new SequentialVisualMemoryProcedure(
      json.parameters.duration,
      json.parameters.delayTime,
      json.parameters.stimuliType,
      json.parameters.stimuliLength
    );
  } else if (json.procedure === "Charactor Sequenceing") {
    return new CharactorSequenceingProcedure(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.promptType,
      json.parameters.promptLength
    );
  } else {
    throw new Error("Invalid procedure type");
  }
}
