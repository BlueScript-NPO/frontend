import {
  Value,
  ElepsedTime,
  TrialCount,
  AccuracyValue,
  AvrageAccuracyValue,
  AvrageTrialTime,
  TrialsTableValue,
  PercentAccuracyValue,
  avrageRevealedValue,
} from "./value";
import {
  Procedure,
  RapidVisualPerception,
  SequentialVisualMemoryProcedure,
  CharactorSequenceingProcedure,
  jsonToProcedure,
  CharactorMatchingProcedure,
  CharactorGuesstimateProcedure,
} from "./procedure";

export abstract class TrainingResult {
  doctorID: string;
  patientID: string;
  date: Date;
  notes: string;
  values: Value[] = [];
  procedure: Procedure;

  constructor(
    doctorID: string,
    patientID: string,
    notes: string,
    date: Date = new Date(),
    procedure: Procedure
  ) {
    this.doctorID = doctorID;
    this.patientID = patientID;
    this.date = date;
    this.notes = notes;
    this.procedure = procedure;
  }

  toJson(): any {
    const valuesJson = this.values.reduce((acc, value) => {
      return { ...acc, ...value.toJson() };
    }, {});
    return {
      doctorID: this.doctorID,
      patientID: this.patientID,
      date: this.date,
      notes: this.notes,
      result: valuesJson,
      parameter: this.procedure.toJson(),
    };
  }
}

export class RapidVisualPerceptionResult extends TrainingResult {
  accuracy: PercentAccuracyValue;
  elepsedTime: ElepsedTime;
  trialCount: TrialCount;

  constructor(
    accuracy: { total: number; counted: number },
    elepsedTime: number,
    trialCount: number,
    doctorID: string,
    patientID: string,
    notes: string = "",
    date: Date = new Date(),
    parameter: RapidVisualPerception
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.accuracy = new PercentAccuracyValue(accuracy);

    this.values.push(this.accuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
  }
}

export class SequentialVisualMemoryResult extends TrainingResult {
  accuracy: PercentAccuracyValue;
  elepsedTime: ElepsedTime;
  trialCount: TrialCount;

  constructor(
    accuracy: { total: number; counted: number },
    elepsedTime: number,
    trialCount: number,
    doctorID: string,
    patientID: string,
    notes: string = "",
    date: Date = new Date(),
    parameter: SequentialVisualMemoryProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.accuracy = new PercentAccuracyValue(accuracy);

    this.values.push(this.accuracy);
    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
  }
}

export class CharactorSequenceingResult extends TrainingResult {
  trialCount: TrialCount;
  elepsedTime: ElepsedTime;
  avrageAccuracy: AvrageAccuracyValue;
  avrageTrialTime: AvrageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    avrageAccuracy: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    doctorID: string,
    patientID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharactorSequenceingProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.avrageAccuracy = new AvrageAccuracyValue(avrageAccuracy);
    this.avrageTrialTime = new AvrageTrialTime(avrageTrialTime);
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
  elepsedTime: ElepsedTime;
  avrageAccuracy: AvrageAccuracyValue;
  avrageTrialTime: AvrageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    avrageAccuracy: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    doctorID: string,
    patientID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharactorMatchingProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.avrageAccuracy = new AvrageAccuracyValue(avrageAccuracy);
    this.avrageTrialTime = new AvrageTrialTime(avrageTrialTime);
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
  elepsedTime: ElepsedTime;
  accuracy: AccuracyValue;
  avrageRevealed: avrageRevealedValue;
  avrageTrialTime: AvrageTrialTime;
  trialData: TrialsTableValue;

  constructor(
    accuracy: number,
    avrageRevealed: number,
    avrageTrialTime: number,
    trialCount: number,
    trialData: any[],
    elepsedTime: number,
    doctorID: string,
    patientID: string,
    notes: string,
    date: Date = new Date(),
    parameter: CharactorGuesstimateProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.accuracy = new AccuracyValue(accuracy);
    this.avrageRevealed = new avrageRevealedValue(avrageRevealed);
    this.avrageTrialTime = new AvrageTrialTime(avrageTrialTime);
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
    return new RapidVisualPerceptionResult(
      json.result.accuracy,
      json.result.elepsedTime,
      json.result.trialCount,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as RapidVisualPerception
    );
  } else if (json.parameter.procedure === "Sequential Visual Memory") {
    return new SequentialVisualMemoryResult(
      json.result.accuracy,
      json.result.elepsedTime,
      json.result.trialCount,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as SequentialVisualMemoryProcedure
    );
  } else if (json.parameter.procedure === "Charactor Sequenceing") {
    return new CharactorSequenceingResult(
      json.result.avrageAccuracy,
      json.result.avrageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elepsedTime,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharactorSequenceingProcedure
    );
  } else if (json.parameter.procedure === "Charactor Matching") {
    return new CharactorMatchingResult(
      json.result.avrageAccuracy,
      json.result.avrageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elepsedTime,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharactorMatchingProcedure
    );
  } else if (json.parameter.procedure === "Charactor Guesstimate") {
    return new CharactorGuesstimateResult(
      json.result.accuracy,
      json.result.avrageRevealed,
      json.result.avrageTrialTime,
      json.result.trialCount,
      json.result.trials,
      json.result.elepsedTime,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as CharactorGuesstimateProcedure
    );
  } else {
    throw new Error("Invalid result type");
  }
}
