import { HttpException, HttpStatus } from '@nestjs/common';
import { users } from '../modules/user/users';

export function hasRoleLecturer(user): boolean {
  if (user.role != users.INSTRUCTOR) {
    throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
  }
  return true;
}
export function hasRoleStudent(user): boolean {
  if (user.role != users.STUDENT) {
    throw new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
  }
  return true;
}
