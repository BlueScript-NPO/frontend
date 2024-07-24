import {
  Value,
  ElapsedTime,
  TrialCount,
  AccuracyValue,
  AverageAccuracyValue,
  AverageTrialTime,
  TrialsTableValue,
  PercentAccuracyValue,
  AverageRevealedValue,
} from "./value";
import {
  Procedure,
  RapidVisualPerceptionProcedure,
  SequentialVisualMemoryProcedure,
  CharacterSequencingProcedure,
  jsonToProcedure,
  CharacterMatchingProcedure,
  CharacterGuesstimateProcedure,
} from "./procedure";

export abstract class TrainingResult {
  trainerID: string;
  traineeID: string;
  date: Date;
  notes: string;
  values: Value[] = [];
  procedure: Procedure;

  constructor(
    trainerID: string,
    traineeID: string,
    notes: string,
    date: Date = new Date(),
    procedure: Procedure
  ) {
    this.trainerID = trainerID;
    this.traineeID = traineeID;
    this.date = date;
    this.notes = notes;
    this.procedure = procedure;
  }

  toJson(): any {
    const valuesJson = this.values.reduce((acc, value) => {
      return { ...acc, ...value.toJson() };
    }, {});
    return {
      trainerID: this.trainerID,
      traineeID: this.traineeID,
      date: this.date,
      notes: this.notes,
      result: valuesJson,
      parameter: this.procedure.toJson(),
    };
  }
}

export class RapidVisualPerceptionProcedureResult extends TrainingResult {
  accuracy: PercentAccuracyValue;
  elepsedTime: ElapsedTime;
  trialCount: TrialCount;

  constructor(
    accuracy: { total: number; counted: number },
    elepsedTime: number,
    trialCount: number,
    trainerID: string,
    traineeID: string,
    notes: string = "",
    date: Date = new Date(),
    parameter: RapidVisualPerceptionProcedure
  ) {
    super(trainerID, traineeID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElapsedTime(elepsedTime);
    this.accuracy = new PercentAccuracyValue(accuracy);

    this.values.push(this.accuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
  }
}

export class SequentialVisualMemoryResult extends TrainingResult {
  accuracy: PercentAccuracyValue;
  elepsedTime: ElapsedTime;
  trialCount: TrialCount;

  constructor(
    accuracy: { total: number; counted: number },
    elepsedTime: number,
    trialCount: number,
    trainerID: string,
    traineeID: string,
    notes: string = "",
    date: Date = new Date(),
    parameter: SequentialVisualMemoryProcedure
  ) {
    super(trainerID, traineeID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElapsedTime(elepsedTime);
    this.accuracy = new PercentAccuracyValue(accuracy);

    this.values.push(this.accuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
  }
}

export class CharactorSequenceingResult extends TrainingResult {
  trialCount: TrialCount;
  elepsedTime: ElapsedTime;
  avrageAccuracy: AverageAccuracyValue;
  avrageTrialTime: AverageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    avrageAccuracy: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    trainerID: string,
    traineeID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharacterSequencingProcedure
  ) {
    super(trainerID, traineeID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElapsedTime(elepsedTime);
    this.avrageAccuracy = new AverageAccuracyValue(avrageAccuracy);
    this.avrageTrialTime = new AverageTrialTime(avrageTrialTime);
    this.trialData = new TrialsTableValue(trialData);

    this.values.push(this.avrageAccuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);

    this.values.push(this.avrageTrialTime);
    this.values.push(this.trialData);
  }
}

export class CharactorMatchingResult extends TrainingResult {
  trialCount: TrialCount;
  elepsedTime: ElapsedTime;
  avrageAccuracy: AverageAccuracyValue;
  avrageTrialTime: AverageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    avrageAccuracy: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    trainerID: string,
    traineeID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharacterMatchingProcedure
  ) {
    super(trainerID, traineeID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElapsedTime(elepsedTime);
    this.avrageAccuracy = new AverageAccuracyValue(avrageAccuracy);
    this.avrageTrialTime = new AverageTrialTime(avrageTrialTime);
    this.trialData = new TrialsTableValue(trialData);

    this.values.push(this.avrageAccuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);

    this.values.push(this.avrageTrialTime);
    this.values.push(this.trialData);
  }
}

export class CharactorGuesstimateResult extends TrainingResult {
  trialCount: TrialCount;
  elepsedTime: ElapsedTime;
  accuracy: AccuracyValue;
  avrageRevealed: AverageRevealedValue;
  avrageTrialTime: AverageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    accuracy: number,
    avrageRevealed: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    trainerID: string,
    traineeID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharacterGuesstimateProcedure
  ) {
    super(trainerID, traineeID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElapsedTime(elepsedTime);
    this.accuracy = new AccuracyValue(accuracy);
    this.avrageRevealed = new AverageRevealedValue(avrageRevealed);
    this.avrageTrialTime = new AverageTrialTime(avrageTrialTime);
    this.trialData = new TrialsTableValue(trialData);

    this.values.push(this.accuracy);
    this.values.push(this.avrageRevealed);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
    this.values.push(this.avrageTrialTime);
    this.values.push(this.trialData);
  }
}

export function jsonToTrainingResult(json: any): TrainingResult {
  if (json.parameter.procedure === "Rapid Visual Perception") {
    return new RapidVisualPerceptionProcedureResult(
      json.result.accuracy,
      json.result.elapsedTime,
      json.result.trialCount,
      json.trainerID,
      json.traineeID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as RapidVisualPerceptionProcedure
    );
  } else if (json.parameter.procedure === "Sequential Visual Memory") {
    return new SequentialVisualMemoryResult(
      json.result.accuracy,
      json.result.elapsedTime,
      json.result.trialCount,
      json.trainerID,
      json.traineeID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as SequentialVisualMemoryProcedure
    );
  } else if (json.parameter.procedure === "Character Sequencing") {
    return new CharactorSequenceingResult(
      json.result.averageAccuracy,
      json.result.averageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elapsedTime,
      json.trainerID,
      json.traineeID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharacterSequencingProcedure
    );
  } else if (json.parameter.procedure === "Character Matching") {
    return new CharactorMatchingResult(
      json.result.averageAccuracy,
      json.result.averageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elapsedTime,
      json.trainerID,
      json.traineeID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharacterMatchingProcedure
    );
  } else if (json.parameter.procedure === "Character Guesstimate") {
    return new CharactorGuesstimateResult(
      json.result.accuracy,
      json.result.averageRevealed,
      json.result.averageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elapsedTime,
      json.trainerID,
      json.traineeID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharacterGuesstimateProcedure
    );
  } else {
    throw new Error("Invalid result type");
  }
}
