import { Request, Response } from "express";
import Patient from "../models/patient";

export const createPatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, dob, contactInfo, ...patientData } = req.body;

    const existingPatient = await Patient.findOne({
      name: name,
      "contactInfo.phone": contactInfo.phone,
      dob: dob,
    });

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already exists",
      });
    }

    const newPatient = new Patient(patientData);
    await newPatient.save();

    res
      .status(201)
      .json({ message: "Patient created successfully", patient: newPatient });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPatients = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const patients = await Patient.find({});

    res.status(200).json(patients);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatientById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const patientId = req.params.id;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const patientId = req.params.id;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.body, {
      new: true,
    });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const patientId = req.params.id;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
