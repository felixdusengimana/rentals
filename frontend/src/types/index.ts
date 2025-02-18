export interface ITable{
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPaginatedResponse<T> {
    data: T[];               
    page: number;         
    pageSize: number;     
    totalPages: number;   
    totalProperties: number;
    status: 'success' | 'error';
    message?: string; 
}
  