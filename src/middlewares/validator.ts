import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Error handler middleware
const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 6, max: 25 })
    .withMessage("Email must be between 6 and 25 characters"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ max: 64 })
    .withMessage("Password must be less than 64 characters"),

  handleValidationErrors,
];

export const validateSignup = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4, max: 50 })
    .withMessage("Name must be between 4 and 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 6, max: 25 })
    .withMessage("Email must be between 6 and 25 characters"),

  body("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage(
      "Password must be strong (min 8 characters, 1 lowercase, 1 uppercase, 1 number, and 1 symbol)"
    )
    .isLength({ max: 64 })
    .withMessage("Password must be less than 64 characters"),

  handleValidationErrors,
];

export const validatePatient = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters"),

  body("dob")
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO 8601 date")
    .notEmpty()
    .withMessage("Date of birth is required"),

  body("roomNumber")
    .isString()
    .withMessage("Room number must be a string")
    .notEmpty()
    .withMessage("Room number is required"),

  body("bedNumber")
    .isString()
    .withMessage("Bed number must be a string")
    .notEmpty()
    .withMessage("Bed number is required"),

  body("floorNumber")
    .isString()
    .withMessage("Floor number must be a string")
    .notEmpty()
    .withMessage("Floor number is required"),

  body("age")
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer")
    .notEmpty()
    .withMessage("Age is required"),

  body("gender")
    .isString()
    .withMessage("Gender must be a string")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be 'Male', 'Female', or 'Other'")
    .notEmpty()
    .withMessage("Gender is required"),

  body("contactInfo.phone")
    .isString()
    .withMessage("Phone number must be a string")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("en-IN")
    .withMessage("Phone number must be valid"),

  body("contactInfo.email")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Email must be valid"),

  body("diseases")
    .optional()
    .isArray()
    .withMessage("Diseases must be an array"),

  body("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array"),

  body("emergencyContact")
    .optional()
    .isArray()
    .withMessage("Emergency contact must be an array"),

  handleValidationErrors,
];
