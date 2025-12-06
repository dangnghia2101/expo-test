export interface IBaseError {
  code: string;
  message: string;
  success: boolean;
}

export type SortOrder = 'asc' | 'desc';
