export interface RESPONSE<T> {
  status: string;
  message: T;
}

export const SUCCESS_RESPONSE = <T>(message: T): RESPONSE<T> => ({ status: 'SUCCESS', message });
export const FAILURE_RESPONSE = <T>(message: T): RESPONSE<T> => ({ status: 'FAILURE', message });
