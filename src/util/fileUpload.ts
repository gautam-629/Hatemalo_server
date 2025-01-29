import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";
import { IFileUploader } from "../common/types";

export class FileUploader implements IFileUploader{
  private storage: multer.StorageEngine;
  private upload: multer.Multer;

  constructor(
    private uploadPath: string = "uploads/",
    private allowedMimes: string[] = ["image/jpeg", "image/png", "application/pdf"],
    private maxSize: number = 5 * 1024 * 1024 // 5MB default
  ) {
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    this.storage = multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, this.uploadPath);
      },
      filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
      }
    });

    this.upload = multer({
      storage: this.storage,
      limits: { fileSize: this.maxSize },
      fileFilter: (req: Request, file: Express.Multer.File, cb) => {
        if (!this.allowedMimes.includes(file.mimetype)) {
          return cb(new Error("Invalid file type"));
        }
        cb(null, true);
      }
    });
  }

  single(fieldName: string) {
    return this.upload.single(fieldName);
  }

  array(fieldName: string, maxCount: number) {
    return this.upload.array(fieldName, maxCount);
  }

  fields(fields: multer.Field[]) {
    return this.upload.fields(fields);
  }

  async deleteFile(filename: string): Promise<boolean> {
    const filePath = path.join(this.uploadPath, filename);
    try {
      await fs.promises.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }
}