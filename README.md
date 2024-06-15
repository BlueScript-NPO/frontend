# BlueScript front-end

BlueScript is a Non Profit Organization creating open source software to aid people who suffer dylexia.

## Getting Started

If you want to contribute to this project, you can clone this repository and start working on it. After cloning the repository, you run the following commands to start the project:

```bash
npm install
npm run dev
```

This project uses Nuxt UI pro and license is needed to build the project. You can get a license from [Nuxt UI Pro](https://ui.nuxt.com/pro/pricing).

## Json API Structure Example

These endpoints are subject to change will be implemented in the backnd. (This is just an reference for the backend developers)

### User

**/api/user/logn** `POST`

```json
{
  "id": "jack",
  "password": "p@ssw0rd"
}
```

**/api/user/register** `POST`

```json
{
  "id": "jack",
  "password": "p@ssw0rd",
  "name": "Jack",
  "email": "Jack@example.com"
}
```

### Training Parameters

**Tachistoscope**

```json
{
  "stimuliType": "Numbers",
  "presentationTime": 0.25,
  "stimuliLength": 3,
  "trainingTime": 60
}
```

**Visual Span**

```json
{
  "stimuliType": "Numbers",
  "presentationTime": 0.1,
  "stimuliLength": 1,
  "trainingTime": 10
}
```

### Training Result

**Tachistoscope**

```json
{
  "procedureName": "Tachistoscope",
  "date": "2024-06-15T11:13:39.436Z",
  "duration": 63,
  "patientId": "json",
  "doctorId": "jack",
  "result": { "accuracy": 80, "trialCount": 10 },
  "procedureParameters": {
    "stimuliType": "Numbers",
    "presentationTime": 0.25,
    "stimuliLength": 3,
    "trainingTime": 60
  }
}
```

**Visual Span**

```json
{
  "procedureName": "Visual Span",
  "date": "2024-06-15T11:34:11.326Z",
  "duration": 15,
  "patientId": "json",
  "doctorId": "jack",
  "result": { "accuracy": 100, "trialCount": 2 },
  "procedureParameters": {
    "stimuliType": "Numbers",
    "presentationTime": 0.1,
    "stimuliLength": 1,
    "trainingTime": 10
  }
}
```
