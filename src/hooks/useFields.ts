import { useState, useEffect } from 'react';
import { fieldsAPI } from '../services/api';
import { FootballField } from '../types';

interface UseFieldsParams {
  keyword?: string;
  district?: string;
  fieldType?: number;
  page?: number;
}

export function useFields(params?: UseFieldsParams) {
  const [fields, setFields] = useState<FootballField[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadFields = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fieldsAPI.getFields(params);
      
      if (response.success) {
        const mappedFields: FootballField[] = response.data.map((field: any) => ({
          id: field.id.toString(),
          name: field.name,
          address: field.address,
          district: field.district,
          fieldType: field.fieldType === 1 ? '5v5' : field.fieldType === 2 ? '7v7' : '11v11',
          pricePerHour: field.pricePerHour || 200000,
          images: field.images || [],
          description: field.description || '',
          amenities: [],
          rating: field.averageRating || 0,
          ownerId: field.ownerId?.toString() || ''
        }));
        setFields(mappedFields);
      }
    } catch (err: any) {
      console.error('Failed to load fields:', err);
      setError(err.response?.data?.message || 'Không thể tải danh sách sân');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFields();
  }, [params?.keyword, params?.district, params?.fieldType, params?.page]);

  return {
    fields,
    loading,
    error,
    refetch: loadFields
  };
}

export function useFieldDetail(fieldId: string) {
  const [field, setField] = useState<FootballField | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadField = async () => {
    if (!fieldId) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fieldsAPI.getFieldById(fieldId);
      
      if (response.success) {
        const fieldData = response.data;
        const mappedField: FootballField = {
          id: fieldData.id.toString(),
          name: fieldData.name,
          address: fieldData.address,
          district: fieldData.district,
          fieldType: fieldData.fieldType === 1 ? '5v5' : fieldData.fieldType === 2 ? '7v7' : '11v11',
          pricePerHour: fieldData.pricePerHour || 200000,
          images: fieldData.images || [],
          description: fieldData.description || '',
          amenities: [],
          rating: fieldData.averageRating || 0,
          ownerId: fieldData.ownerId?.toString() || ''
        };
        setField(mappedField);
      }
    } catch (err: any) {
      console.error('Failed to load field:', err);
      setError(err.response?.data?.message || 'Không thể tải thông tin sân');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadField();
  }, [fieldId]);

  return {
    field,
    loading,
    error,
    refetch: loadField
  };
}

export function useFieldSchedule(fieldId: string, date: string) {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSchedule = async () => {
    if (!fieldId || !date) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await fieldsAPI.getFieldSchedule(fieldId, date);
      
      if (response.success) {
        setSchedule(response.data.timeSlots || []);
      }
    } catch (err: any) {
      console.error('Failed to load schedule:', err);
      setError(err.response?.data?.message || 'Không thể tải lịch sân');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedule();
  }, [fieldId, date]);

  return {
    schedule,
    loading,
    error,
    refetch: loadSchedule
  };
}