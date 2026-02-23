import { useState, useCallback, useEffect } from 'react';
import type { TeamMember, MemberFormData } from '../types';
import { DUMMY_MEMBERS } from '../data/team';

interface UseTeamReturn {
  members: TeamMember[];
  loading: boolean;
  submitting: boolean;
  fetchMembers: () => Promise<void>;
  addMember: (
    data: MemberFormData,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => Promise<void>;
  editMember: (
    id: string,
    data: MemberFormData,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => Promise<void>;
  deleteMember: (
    id: string,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => Promise<void>;
}

const buildFormData = (data: MemberFormData): FormData => {
  const fd = new FormData();
  fd.append('name', data.name);
  fd.append('title', data.title);
  fd.append('role', data.role);
  fd.append('bio', data.bio);
  fd.append('skills', JSON.stringify(data.skills));
  if (data.image instanceof File) {
    fd.append('image', data.image);
  }
  return fd;
};

export const useTeam = (): UseTeamReturn => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:9000/api/users');
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();
      const data: TeamMember[] = (json.data ?? json).map((u: any) => ({
        id: String(u.id),
        name: u.name,
        title: u.title,
        role: u.role,
        bio: u.bio ?? '',
        skills: Array.isArray(u.skills)
          ? u.skills
          : JSON.parse(u.skills ?? '[]'),
        image: u.image ?? null,
        isActive: u.isActive ?? false,
      }));
      setMembers(data);
    } catch {
      // fallback to dummy data when server unreachable
      setMembers(DUMMY_MEMBERS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const addMember = useCallback(async (
    data: MemberFormData,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => {
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:9000/api/users', {
        method: 'POST',
        body: buildFormData(data),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      const created: any = await res.json();
      const newMember: TeamMember = {
        id: String(created.id ?? Date.now()),
        name: data.name,
        title: data.title,
        role: data.role,
        bio: data.bio,
        skills: data.skills,
        image: created.image ?? null,
        isActive: false,
      };
      setMembers(prev => [...prev, newMember]);
      onSuccess();
    } catch (err: unknown) {
      // optimistic fallback
      const newMember: TeamMember = {
        id: String(Date.now()),
        name: data.name,
        title: data.title,
        role: data.role,
        bio: data.bio,
        skills: data.skills,
        image: typeof data.image === 'string' ? data.image : null,
        isActive: false,
      };
      setMembers(prev => [...prev, newMember]);
      onError(err instanceof Error ? err.message : 'Could not reach server');
    } finally {
      setSubmitting(false);
    }
  }, []);

  const editMember = useCallback(async (
    id: string,
    data: MemberFormData,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => {
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:9000/api/users/${id}`, {
        method: 'PATCH',
        body: buildFormData(data),
      });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setMembers(prev => prev.map(m => m.id === id
        ? { ...m, ...data, image: typeof data.image === 'string' ? data.image : m.image }
        : m
      ));
      onSuccess();
    } catch (err: unknown) {
      // optimistic update anyway
      setMembers(prev => prev.map(m => m.id === id
        ? { ...m, name: data.name, title: data.title, role: data.role, bio: data.bio, skills: data.skills }
        : m
      ));
      onError(err instanceof Error ? err.message : 'Could not reach server');
    } finally {
      setSubmitting(false);
    }
  }, []);

  const deleteMember = useCallback(async (
    id: string,
    onSuccess: () => void,
    onError: (msg: string) => void
  ) => {
    try {
      const res = await fetch(`http://localhost:9000/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      setMembers(prev => prev.filter(m => m.id !== id));
      onSuccess();
    } catch (err: unknown) {
      setMembers(prev => prev.filter(m => m.id !== id));
      onError(err instanceof Error ? err.message : 'Could not reach server');
    }
  }, []);

  return { members, loading, submitting, fetchMembers, addMember, editMember, deleteMember };
};

export default useTeam;
