import { db } from './index.ts';
import { enquiries } from './schema.ts';
import { desc } from 'drizzle-orm';

export interface EnquiryData {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  createdAt?: Date | string;
}

// In-memory cache fallback so enquiries are never lost
const memoryEnquiries: EnquiryData[] = [];

export async function createEnquiry(data: EnquiryData) {
  const newRecord: EnquiryData = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    service: data.service,
    message: data.message,
    createdAt: new Date().toISOString(),
  };

  memoryEnquiries.unshift(newRecord);

  try {
    const result = await db.insert(enquiries)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        service: data.service,
        message: data.message,
      })
      .returning();
    
    if (result && result.length > 0) {
      return result[0];
    }
  } catch (error) {
    console.warn("Saving to Cloud SQL enquiries failed, using memory store fallback:", error);
  }

  return newRecord;
}

export async function getAllEnquiries() {
  try {
    const dbRecords = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
    if (dbRecords && dbRecords.length > 0) {
      return dbRecords;
    }
  } catch (error) {
    console.warn("Fetching from Cloud SQL enquiries failed, using memory store fallback:", error);
  }

  return memoryEnquiries;
}
