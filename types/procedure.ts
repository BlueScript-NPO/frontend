import {
  Parameter,
  NumParameter,
  StimuliLengthParameter,
  StimuliTypeParameter,
  PromptTypeParamter,
  PromptLengthParameter,
  TargetLengthParameter,
  TargetCountParameter,
  ChunkSizeParameter,
} from "./parameter";

export abstract class Procedure {
  name: string;
  duration: NumParameter;
  parameters: Parameter[] = [];

  constructor(name: string, duration: number = 5) {
    this.name = name;
    this.duration = new NumParameter(
      "parameter.durationMin",
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

export class RapidVisualPerceptionProcedure extends Procedure {
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
      "parameter.presentationTime",
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
      "parameter.delayTime",
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

export class CharacterSequencingProcedure extends Procedure {
  stimuliType: StimuliTypeParameter;
  promptType: PromptTypeParamter;
  promptLength: PromptLengthParameter;

  constructor(
    duration?: number,
    stimuliType?: string,
    promptType?: string,
    promptLength: number = 16
  ) {
    super("Character Sequencing", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.promptType = new PromptTypeParamter(promptType);
    this.promptLength = new PromptLengthParameter(promptLength);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.promptType);
    this.parameters.push(this.promptLength);
  }
}

export class CharacterMatchingProcedure extends Procedure {
  stimuliType: StimuliTypeParameter;
  targetLength: TargetLengthParameter;
  targetCount: TargetCountParameter;

  constructor(
    duration?: number,
    stimuliType?: string,
    targetLength: number = 2,
    targetCount: number = 15
  ) {
    super("Character Matching", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.targetLength = new TargetLengthParameter(targetLength);
    this.targetCount = new TargetCountParameter(targetCount);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.targetLength);
    this.parameters.push(this.targetCount);
  }
}

export class CharacterGuesstimateProcedure extends Procedure {
  stimuliType: StimuliTypeParameter;
  chunkSize: ChunkSizeParameter;

  constructor(duration?: number, stimuliType?: string, chunkSize?: string) {
    super("Character Guesstimate", duration);
    this.stimuliType = new StimuliTypeParameter(stimuliType);
    this.chunkSize = new ChunkSizeParameter(chunkSize);

    this.parameters.push(this.stimuliType);
    this.parameters.push(this.chunkSize);
  }
}

// function to convert json procedure to Procedure object
export function jsonToProcedure(json: any): Procedure {
  if (json.procedure === "Rapid Visual Perception") {
    return new RapidVisualPerceptionProcedure(
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
  } else if (json.procedure === "Character Sequencing") {
    return new CharacterSequencingProcedure(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.promptType,
      json.parameters.promptLength
    );
  } else if (json.procedure === "Character Matching") {
    return new CharacterMatchingProcedure(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.targetLength,
      json.parameters.targetCount
    );
  } else if (json.procedure === "Character Guesstimate") {
    return new CharacterGuesstimateProcedure(
      json.parameters.duration,
      json.parameters.stimuliType,
      json.parameters.chunkSize
    );
  } else {
    throw new Error("Invalid procedure type");
  }
}
