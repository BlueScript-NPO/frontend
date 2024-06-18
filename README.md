<p align="center">
  <img src="docs/banner.png" width="100%" />
</p>

_🚧 This project is under heavy develpment. We'll be accepting contribution after the minimal foundation is built._

# BlueScript Front End

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

## Training Preset Json Structure Example

### Common Parameters

- **stimuliType**: One of the following string values: `Numbers`, `Alphabet`, `Alphanumeric`, `Korean`

- **duration**: Time in minutes for the training session. An integer between 1 and 15.

### Rapid Visual Perception

```json
{
  "procedure": "Rapid Visual Perception",
  "parameters": {
    "duration": 5,
    "stimuliType": "Alphanumeric",
    "stimuliLength": 1, // int between 1 and 10
    "presentationTime": 0.25 // double between 0.05 and 1
  }
}
```

### Sequential Visual Memory

```json
{
  "procedure": "Sequential Visual Memory",
  "parameters": {
    "duration": 5,
    "stimuliType": "Alphanumeric",
    "stimuliLength": 1, // int between 1 and 10
    "delayTime": 10 // int between 0 and 25
  }
}
```

## Training Result Json Structure Example

### Common Parameters

- **doctorID**: The ID of the doctor who conducted the test.
- **patientID**: The ID of the patient who took the test.
- **date**: The date and time when the test was conducted in the format `YYYY-MM-DDTHH:MM:SS.MMMZ`.
- **notes**: Any additional notes that the doctor wants to add. May be an empty string.
- **parameter**: The parameters used for the test. (identical to the json structure of the training preset)

### Rapid Visual Perception

```json
{
  "doctorID": "DOCTOR",
  "patientID": "PATIENT",
  "date": "2024-06-18T08:36:57.032Z",
  "notes": "Example Note",
  "result": {
    "trialCount": 12, // positive integer
    "elepsedTime": 63, // positive integer
    "accuracy": 91.67 // double between 0 and 100
  },
  "parameter": {
    "procedure": "Rapid Visual Perception",
    "parameters": {
      "duration": 1,
      "stimuliType": "Korean",
      "stimuliLength": 3,
      "presentationTime": 0.25
    }
  }
}
```

### Sequential Visual Memory

```json
{
  "doctorID": "DOCTOR",
  "patientID": "PATIENT",
  "date": "2024-06-18T08:36:57.032Z",
  "notes": "Example Note",
  "result": {
    "trialCount": 12, // positive integer
    "elepsedTime": 63, // positive integer
    "accuracy": 91.67 // double between 0 and 100
  },
  "parameter": {
    "procedure": "Sequential Visual Memory",
    "parameters": {
      "duration": 5,
      "stimuliType": "Alphanumeric",
      "stimuliLength": 1,
      "delayTime": 10
    }
  }
}
```
