import { useEffect, useState } from "react";
import axios from "axios";

import {
  Briefcase,
  User,
  Mail,
  GraduationCap,
  Clock,
  FileText,
  Trash2,
  Download,
  ChevronLeft,
  Send,
  Plus,
  Calendar,
} from "lucide-react";
import styles from "./CareersAdmin.module.scss";

// ── Types
interface CareerApplication {
  id: number;
  fullName: string;
  email: string;
  isRead: boolean;
  qualification: string;
  experience: string;
  motivation: string;
  position: string;
  document_url: string;
  created_at: string;
}

interface ApiResponse {
  message: string;
  data: CareerApplication[];
}

interface TopicsType {
  id: number;
  topic: string;
  created_at: string;
}

const BASE = "https://api.cruciallinkconsultantslt.com/api";

// ── Helpers
function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function getFileName(url: string): string {
  try {
    return url.split("/").pop() ?? "document";
  } catch {
    return "document";
  }
}

// ── Component
export default function CareersAdmin() {
  // Career topic state
  const [topicInput, setTopicInput] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [topicMsg, setTopicMsg] = useState<{
    text: string;
    ok: boolean;
  } | null>(null);

  // career topics

  const [topics, setTopics] = useState<TopicsType[] | null>(null);

  // Applications state
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Selected application
  const [selected, setSelected] = useState<CareerApplication | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Mobile: show detail pane instead of list
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  // ── Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get<ApiResponse>(`${BASE}/careers`);
      const list = Array.isArray(res.data?.data) ? res.data.data : [];
      setApplications(list);
    } catch {
      setFetchError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCareerTopics = async () => {
    setLoading(true);
    setFetchError(null);

    try {
      const res = await axios.get(`${BASE}/careers/topics`);
      setTopics(res.data?.data);
    } catch (error) {
      setFetchError("Failed to load career topics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchCareerTopics();
  }, []);

  // ── Post career topic
  const handleTopicSubmit = async () => {
    const trimmed = topicInput.trim();
    if (!trimmed) return;
    setTopicLoading(true);
    setTopicMsg(null);
    try {
      await axios.post(`${BASE}/careers/topics`, { topic: trimmed });
      setTopicMsg({ text: "Job role posted successfully!", ok: true });
      setTopicInput("");
    } catch {
      setTopicMsg({ text: "Failed to post job role. Try again.", ok: false });
    } finally {
      setTopicLoading(false);
    }
  };

  // - delete a topic
  const handleTopicDelete = async (id: number) => {
    setTopicLoading(true);
    setTopicMsg(null);
    try {
      await axios.delete(`${BASE}/careers/topics/${id}`);
      setTopicMsg({ text: "Job topic deleted successfully! refresh the page.", ok: true });
    } catch {
      setTopicMsg({ text: "Failed to delete topic. Try again.", ok: false });
    } finally {
      setTopicLoading(false);
    }
  };
  // ── Select application & mark read
  const handleSelect = async (app: CareerApplication) => {
    setSelected(app);
    setMobileShowDetail(true);

    if (!app.isRead) {
      try {
        await axios.post(`${BASE}/careers/read/${app.id}`);
        setApplications((prev) =>
          prev.map((a) => (a.id === app.id ? { ...a, isRead: true } : a)),
        );
        setSelected((prev) =>
          prev?.id === app.id ? { ...prev, isRead: true } : prev,
        );
      } catch {
        // silently fail — not critical
      }
    }
  };

  // ── Delete application
  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(id);
    try {
      await axios.delete(`${BASE}/careers/${id}`);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selected?.id === id) {
        setSelected(null);
        setMobileShowDetail(false);
      }
    } catch {
      alert("Failed to delete. Try again.");
    } finally {
      setDeleting(null);
    }
  };

  // ── Download CV
  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // ── Render
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Career Applications</h1>
        <p className={styles.pageDesc}>
          Manage job role postings and review applications submitted by
          candidates.
        </p>
      </div>

      {/* ── Section 1: Career Topic ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>
            <Plus size={18} />
          </span>
          <h2 className={styles.cardTitle}>Post a Job Role</h2>
        </div>

        <div className={styles.topicRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="topicInput" className={styles.label}>
              Job Role Title
            </label>
            <input
              id="topicInput"
              type="text"
              className={styles.input}
              placeholder="e.g. Software Engineer, Research Analyst…"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTopicSubmit()}
            />
          </div>
          <button
            className={styles.submitBtn}
            onClick={handleTopicSubmit}
            disabled={topicLoading || !topicInput.trim()}
          >
            <Send size={15} />
            {topicLoading ? "Posting…" : "Post Role"}
          </button>
        </div>

        <div>
          {topics?.map((topic) => {
            return (
              <span className={styles.topicSpan} key={topic.id}>
                {" "}
                {topic.topic}{" "}
                <button onClick={() => handleTopicDelete(topic.id)}>
                  X
                </button>{" "}
              </span>
            );
          })}
        </div>

        {topicMsg && (
          <p
            className={`${styles.topicMsg} ${topicMsg.ok ? styles.msgOk : styles.msgErr}`}
          >
            {topicMsg.text}
          </p>
        )}
      </div>

      {/* ── Section 2: Applications ── */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.cardIcon}>
            <Briefcase size={18} />
          </span>
          <h2 className={styles.cardTitle}>Submitted Applications</h2>
        </div>

        {/* Loading / Error */}
        {loading && <p className={styles.stateMsg}>Loading applications…</p>}
        {fetchError && (
          <p className={`${styles.stateMsg} ${styles.stateErr}`}>
            {fetchError}
          </p>
        )}

        {!loading && !fetchError && (
          <div className={styles.splitPane}>
            {/* ── Left: List ── */}
            <div
              className={`${styles.listPane} ${mobileShowDetail ? styles.listHidden : ""}`}
            >
              {applications.length === 0 ? (
                <p className={styles.empty}>No applications yet.</p>
              ) : (
                <ul className={styles.list}>
                  {applications.map((app) => (
                    <li
                      key={app.id}
                      className={`${styles.listItem} ${
                        selected?.id === app.id ? styles.listItemActive : ""
                      } ${app.isRead ? styles.listItemRead : styles.listItemUnread}`}
                      onClick={() => handleSelect(app)}
                    >
                      <div className={styles.listItemMain}>
                        <div className={styles.listAvatar}>
                          {(app.fullName ?? "?").charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.listItemText}>
                          <span className={styles.listName}>
                            {app.fullName ?? "—"}
                          </span>
                          <span className={styles.listPosition}>
                            {app.position ?? "—"}
                          </span>
                          {!app.isRead && <span className={styles.unreadDot} />}
                        </div>
                      </div>
                      <button
                        className={styles.deleteBtn}
                        onClick={(e) => handleDelete(app.id, e)}
                        disabled={deleting === app.id}
                        title="Delete application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Right: Detail ── */}
            <div
              className={`${styles.detailPane} ${mobileShowDetail ? styles.detailVisible : ""}`}
            >
              {/* Mobile back button */}
              <button
                className={styles.backBtn}
                onClick={() => {
                  setMobileShowDetail(false);
                  setSelected(null);
                }}
              >
                <ChevronLeft size={16} /> Back to Applications
              </button>

              {selected ? (
                <div className={styles.detail}>
                  {/* Detail header */}
                  <div className={styles.detailHeader}>
                    <div className={styles.detailAvatar}>
                      {(selected.fullName ?? "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className={styles.detailName}>
                        {selected.fullName ?? "—"}
                      </h3>
                      <span className={styles.detailPosition}>
                        {selected.position ?? "—"}
                      </span>
                    </div>
                    <span
                      className={`${styles.badge} ${selected.isRead ? styles.badgeRead : styles.badgeUnread}`}
                    >
                      {selected.isRead ? "Read" : "Unread"}
                    </span>
                  </div>

                  {/* Detail fields */}
                  <div className={styles.detailGrid}>
                    <div className={styles.detailField}>
                      <span className={styles.detailFieldLabel}>
                        <Mail size={13} /> Email
                      </span>
                      <span className={styles.detailFieldValue}>
                        {selected.email ?? "—"}
                      </span>
                    </div>

                    <div className={styles.detailField}>
                      <span className={styles.detailFieldLabel}>
                        <User size={13} /> Position Applied
                      </span>
                      <span className={styles.detailFieldValue}>
                        {selected.position ?? "—"}
                      </span>
                    </div>

                    <div className={styles.detailField}>
                      <span className={styles.detailFieldLabel}>
                        <GraduationCap size={13} /> Qualification
                      </span>
                      <span className={styles.detailFieldValue}>
                        {selected.qualification ?? "—"}
                      </span>
                    </div>

                    <div className={styles.detailField}>
                      <span className={styles.detailFieldLabel}>
                        <Clock size={13} /> Experience
                      </span>
                      <span className={styles.detailFieldValue}>
                        {selected.experience ?? "—"} year
                        {selected.experience !== "1" ? "s" : ""}
                      </span>
                    </div>

                    <div className={styles.detailField}>
                      <span className={styles.detailFieldLabel}>
                        <Calendar size={13} /> Applied On
                      </span>
                      <span className={styles.detailFieldValue}>
                        {selected.created_at
                          ? formatDate(selected.created_at)
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className={styles.motivationBlock}>
                    <span className={styles.detailFieldLabel}>
                      <FileText size={13} /> Cover Note / Motivation
                    </span>
                    <p className={styles.motivationText}>
                      {selected.motivation ?? "—"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className={styles.detailActions}>
                    {selected.document_url ? (
                      <button
                        className={styles.downloadBtn}
                        onClick={() =>
                          handleDownload(
                            selected.document_url,
                            getFileName(selected.document_url),
                          )
                        }
                      >
                        <Download size={15} /> Download CV
                      </button>
                    ) : (
                      <span className={styles.noDoc}>No document attached</span>
                    )}

                    <button
                      className={styles.detailDeleteBtn}
                      onClick={(e) => handleDelete(selected.id, e)}
                      disabled={deleting === selected.id}
                    >
                      <Trash2 size={15} />
                      {deleting === selected.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.detailEmpty}>
                  <Briefcase size={36} className={styles.detailEmptyIcon} />
                  <p>Select an application to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
