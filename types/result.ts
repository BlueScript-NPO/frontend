import { Value, AccuracyValue, ElepsedTime, TrialCount } from "./value";
import {
  Procedure,
  TachistoscopeProcedure,
  VisualSpanProcedure,
  jsonToProcedure,
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

export class TachistoscopeTrainingResult extends TrainingResult {
  accuracy: AccuracyValue;
  elepsedTime: ElepsedTime;
  trialCount: TrialCount;

  constructor(
    accuracy: number,
    elepsedTime: number,
    trialCount: number,
    doctorID: string,
    patientID: string,
    notes: string = "",
    date: Date = new Date(),
    parameter: TachistoscopeProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.accuracy = new AccuracyValue(accuracy);

    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
    this.values.push(this.accuracy);
  }
}

export class VisualSpanTrainingResult extends TrainingResult {
  trialCount: TrialCount;
  elepsedTime: ElepsedTime;
  accuracy: AccuracyValue;

  constructor(
    accuracy: number,
    elepsedTime: number,
    trialCount: number,
    doctorID: string,
    patientID: string,
    notes: string,
    date: Date = new Date(),
    parameter: VisualSpanProcedure
  ) {
    super(doctorID, patientID, notes, date, parameter);
    this.trialCount = new TrialCount(trialCount);
    this.elepsedTime = new ElepsedTime(elepsedTime);
    this.accuracy = new AccuracyValue(accuracy);

    this.values.push(this.trialCount);
    this.values.push(this.elepsedTime);
    this.values.push(this.accuracy);
  }
}

export function jsonToTrainingResult(json: any): TrainingResult {
  if (json.parameter.procedure === "Tachistoscope") {
    return new TachistoscopeTrainingResult(
      json.result.accuracy,
      json.result.elepsedTime,
      json.result.trialCount,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as TachistoscopeProcedure
    );
  } else if (json.parameter.procedure === "Visual Span") {
    return new VisualSpanTrainingResult(
      json.result.accuracy,
      json.result.elepsedTime,
      json.result.trialCount,
      json.doctorID,
      json.patientID,
      json.notes,
      json.date,
      jsonToProcedure(json.parameter) as VisualSpanProcedure
    );
  } else {
    throw new Error("Invalid procedure type");
  }
}