// src/pages/admin/types.ts
export interface Message {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
    read: boolean;
    submittedAt: string;
  }
  
  export interface MessagesResponse {
    data: {
      messages: Message[];
      total: number;
      totalPages: number;
      currentPage: number;
    };
  }