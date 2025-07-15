import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor_id: string;
  thumbnail_url: string;
  category: string;
  level: string;
  price: number;
  duration_hours: number;
  rating: number;
  total_students: number;
  instructor: {
    full_name: string;
  };
}

export const useCourses = (category?: string, searchTerm?: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [category, searchTerm]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('courses')
        .select(`
          *,
          instructor:profiles!courses_instructor_id_fkey(full_name)
        `)
        .eq('is_published', true);

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      setCourses(data || []);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  return { courses, loading, error, refetch: fetchCourses };
};