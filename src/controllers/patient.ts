import { Request, Response } from "express";
import Patient from "../models/patient";

export const createPatient = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, dob, contactInfo, ...patientData } = req.body;
    console.log(name, dob, contactInfo, patientData);

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

    const newPatient = new Patient(req.body);
    await newPatient.save();

    res.status(201).json({ message: "Patient created successfully" });
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

    res.status(200).json({ patient });
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

    const { name, dob, ...updateFields } = req.body;

    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient data updated successfully",
      updatedPatient,
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
