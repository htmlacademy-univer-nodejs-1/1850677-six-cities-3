import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-filed.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { UnknownRecord } from '../types/unknown-record.type.js';
import { DEFAULT_STATIC_IMAGES } from '../../rest/rest.constant.js';
import * as jose from 'jose';
import * as crypto from 'node:crypto';
import { TokenPayload } from '../types/token-payload.type.js';

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) {
  return {
    error: message,
    errorType: serviceError,
    message,
    details: [...details],
  };
}

export function transformErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function transformObject(properties: string[], staticPath: string, uploadPath: string, data: UnknownRecord) {
  return properties
    .forEach((property) => {
      transformProperty(property, data, (target: UnknownRecord) => {
        const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });
}

export function transformProperty(
  property: string,
  someObject: UnknownRecord,
  transformFunc: (object: UnknownRecord) => void
) {
  return Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFunc(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownRecord, transformFunc);
      }
    });
}

export function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export async function createJWT(algorithm: string, jwtSecret: string, payload: TokenPayload): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}
