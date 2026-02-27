import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type {
  DashboardContextValue,
  WhyPickUsItem,
  CallingTime,
  WebsiteInfo,
} from "../types";
import {
  FALLBACK_WHY_PICK_US,
  FALLBACK_CALLING_TIME,
  FALLBACK_COMPLIANCE,
  BASE_URL,
} from "../data/dashboard";
import { useSettings } from "../hooks/useSettings";
import { useTeam } from "../hooks/useTeam";

const DashboardContext = createContext<DashboardContextValue>(
  {} as DashboardContextValue,
);

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ── Compliance ────────────────────────────────────────
  const [compliance, setCompliance] =
    useState<WebsiteInfo>(FALLBACK_COMPLIANCE);
  const [complianceLoading, setComplianceLoading] = useState(true);
  const [complianceSaving, setComplianceSaving] = useState(false);

  // ── Calling time ──────────────────────────────────────
  const [callingTime, setCallingTime] = useState<CallingTime>(
    FALLBACK_CALLING_TIME,
  );
  const [callingTimeLoading, setCallingTimeLoading] = useState(true);
  const [callingTimeSaving, setCallingTimeSaving] = useState(false);

  // ── Why pick us ───────────────────────────────────────
  const [whyPickUs, setWhyPickUs] = useState<WhyPickUsItem[]>([]);
  const [whyPickUsLoading, setWhyPickUsLoading] = useState(true);
  const [addingReason, setAddingReason] = useState(false);
  const [deletingReasonId, setDeletingReasonId] = useState<number | null>(null);
  const [editingReasonId, setEditingReasonId] = useState<number | null>(null);

  // ── Unread messages count ─────────────────────────────
  const [unreadCount, setUnreadCount] = useState(0);

  // webinfo fetch (for metrics)
  const [webInfo, setWebInfo] = useState<WebsiteInfo | null>(null);

  // settings page hook
  const { settings, saving, updateField, saveSection } = useSettings();

  //team members

  const { members, loading, submitting, addMember, editMember, deleteMember } =
    useTeam();

  const hasFetched = useRef(false);

  // ── Fetch everything on mount with Promise.all ────────
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchAll = async () => {
      try {
        const [
          websiteInfoRes,
          callingTimesRes,
          whyPickUsRes,
          messagesRes
        ] = await Promise.all([
          fetch(`${BASE_URL}/website-info`, {
            credentials: "include",
          }).catch(() => null),

          fetch(`${BASE_URL}/calling-times`, {
            credentials: "include",
          }).catch(() => null),

          fetch(`${BASE_URL}/why-pick-us`, {
            credentials: "include",
          }).catch(() => null),

          fetch(`${BASE_URL}/messages`, {
            credentials: "include",
          }).catch(() => null),
        ]);
        // Website info / compliance
        if (websiteInfoRes?.ok) {
          const data = await websiteInfoRes.json();
          setWebInfo(data);
          setCompliance({
            compliance_increase:
              data.compliance_increase ??
              FALLBACK_COMPLIANCE.compliance_increase,
            compliance_time:
              data.compliance_time ?? FALLBACK_COMPLIANCE.compliance_time,
            ...data,
          });
        }

        // Calling times
        if (callingTimesRes?.ok) {
          const data = await callingTimesRes.json();
          const ct = Array.isArray(data) ? data[0] : data;
          if (ct) setCallingTime(ct);
        }

        // Why pick us
        if (whyPickUsRes?.ok) {
          const data: WhyPickUsItem[] = await whyPickUsRes.json();
          setWhyPickUs(data.length ? data : FALLBACK_WHY_PICK_US);
        } else {
          setWhyPickUs(FALLBACK_WHY_PICK_US);
        }

        // Unread count
        if (messagesRes?.ok) {
          const data = await messagesRes.json();
          const arr = Array.isArray(data) ? data : [];
          setUnreadCount(
            arr.filter((m: { isRead: boolean }) => !m.isRead).length,
          );
        }
      } catch {
        setWhyPickUs(FALLBACK_WHY_PICK_US);
      } finally {
        setComplianceLoading(false);
        setCallingTimeLoading(false);
        setWhyPickUsLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ── Compliance actions ────────────────────────────────
  const updateCompliance = useCallback(
    (field: keyof WebsiteInfo, val: string) => {
      setCompliance((prev) => ({ ...prev, [field]: val }));
    },
    [],
  );

  const submitCompliance = useCallback(
    async (onSuccess: () => void, onError: (m: string) => void) => {
      setComplianceSaving(true);
      try {
        const res = await fetch(`${BASE_URL}/website-info`, {
          method: "POST",
          credentials: "include", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metrics: compliance }),
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        onSuccess();
      } catch (e: unknown) {
        onError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setComplianceSaving(false);
      }
    },
    [compliance],
  );

  // ── Calling time actions ──────────────────────────────
  const updateCallingTime = useCallback(
    (field: keyof CallingTime, val: string) => {
      setCallingTime((prev) => ({ ...prev, [field]: val }));
    },
    [],
  );

  const submitCallingTime = useCallback(
    async (onSuccess: () => void, onError: (m: string) => void) => {
      setCallingTimeSaving(true);
      try {
        const res = await fetch(`${BASE_URL}/calling-times`, {
          method: "POST",
          credentials: "include", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(callingTime),
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        onSuccess();
      } catch (e: unknown) {
        onError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setCallingTimeSaving(false);
      }
    },
    [callingTime],
  );

  // ── Why pick us actions ───────────────────────────────
  const addReason = useCallback(
    async (
      content: string,
      onSuccess: () => void,
      onError: (m: string) => void,
    ) => {
      setAddingReason(true);
      try {
        const res = await fetch(`${BASE_URL}/why-pick-us`, {
          method: "POST",credentials: "include", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const created: WhyPickUsItem = await res.json();
        setWhyPickUs((prev) => [...prev, created]);
        onSuccess();
      } catch (e: unknown) {
        // Optimistic fallback with temp id
        const temp: WhyPickUsItem = {
          id: Date.now(),
          content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setWhyPickUs((prev) => [...prev, temp]);
        onError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setAddingReason(false);
      }
    },
    [],
  );

  const editReason = useCallback(
    async (
      id: number,
      content: string,
      onSuccess: () => void,
      onError: (m: string) => void,
    ) => {
      setEditingReasonId(id);
      try {
        const res = await fetch(`${BASE_URL}/why-pick-us/${id}`, {
          method: "PATCH",credentials: "include", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        setWhyPickUs((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, content, updated_at: new Date().toISOString() }
              : item,
          ),
        );
        onSuccess();
      } catch (e: unknown) {
        // Optimistically update anyway
        setWhyPickUs((prev) =>
          prev.map((item) => (item.id === id ? { ...item, content } : item)),
        );
        onError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setEditingReasonId(null);
      }
    },
    [],
  );

  const deleteReason = useCallback(
    async (id: number, onSuccess: () => void, onError: (m: string) => void) => {
      setDeletingReasonId(id);
      try {
        const res = await fetch(`${BASE_URL}/why-pick-us/${id}`, {
          method: "DELETE",credentials: "include", 
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        setWhyPickUs((prev) => prev.filter((item) => item.id !== id));
        onSuccess();
      } catch (e: unknown) {
        setWhyPickUs((prev) => prev.filter((item) => item.id !== id));
        onError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setDeletingReasonId(null);
      }
    },
    [],
  );

  return (
    <DashboardContext.Provider
      value={{
        members,
        loading,
        submitting,
        addMember,
        editMember,
        deleteMember,
        settings,
        saving,
        updateField,
        saveSection,
        compliance,
        complianceLoading,
        updateCompliance,
        submitCompliance,
        complianceSaving,
        callingTime,
        callingTimeLoading,
        webInfo,
        updateCallingTime,
        submitCallingTime,
        callingTimeSaving,
        whyPickUs,
        whyPickUsLoading,
        addReason,
        editReason,
        deleteReason,
        addingReason,
        deletingReasonId,
        editingReasonId,
        unreadCount,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
