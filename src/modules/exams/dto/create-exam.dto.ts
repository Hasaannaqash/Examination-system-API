export class CreateExamDto {
  name: string;
  description: string;
  examStatus?: string;
  examDate: Date;
  examTime: Date;
  examDuration: number;
  published?: boolean;
  classId: number;
}
