import React, { useCallback } from 'react';
import { Info, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useMetrics } from '../../hooks/useMetrics';
import MetricCard from '../MetricCard/MetricCard';
import type { MetricCard as MetricCardType} from '../../types';
import { useDashboard } from '../../context/DashboardContext';




const SiteContentPage: React.FC = () => {
  const {webInfo} = useDashboard();

  const INITIAL_METRICS: MetricCardType[] = [
	{
		id: 'total_projects',
		label: 'Total Projects',
		value: webInfo?.total_projects ||"",
		description: "Displayed in the 'Impact' section of the homepage.",
		icon: 'LayoutDashboard',
	},
	{
		id: 'regions_served',
		label: 'Regions Served',
		value: webInfo?.regions_served || '',
		description: 'Used for the global coverage map visualization.',
		icon: 'Globe',
	},
	{
		id: 'client_retention',
		label: 'Client Retention Rate',
		value: webInfo?.client_retention || '',
		description: 'Highlight of the annual shareholder report module.',
		icon: 'UserCheck',
	},
	{
		id: 'data_points',
		label: 'Data Points Analyzed',
		value: webInfo?.data_points || '',
		description: "Showcases the scale of CLC's proprietary algorithms.",
		icon: 'Database',
	},
	{
		id: 'compliance',
		label: 'Compliance Increase',
		value: webInfo?.compliance_increase || '',
		description: 'Key benefit metric displayed for new corporate clients.',
		icon: 'Shield',
	},
	{
		id: 'experience',
		label: 'Years of Experience',
		value: webInfo?.years_of_experience || '',
		description: 'Historical trust metric for the "About Us" page.',
		icon: 'Award',
	},
];

  const { addToast } = useToast();
  const {
    editValues,
    editingId,
    isSaving,
    handleEditToggle,
    handleValueChange,
    handleSave,
    handleCancel,
  } = useMetrics();

  const onEditToggle = useCallback(
    (id: string) => handleEditToggle(id, INITIAL_METRICS),
    [handleEditToggle]
  );

  const onSave = useCallback(() =>
    handleSave(
      INITIAL_METRICS,
      () => addToast('Changes saved successfully!', 'success'),
      (msg) => addToast(`Failed to save: ${msg}`, 'error')
    ),
    [handleSave, addToast]
  );

  return (
    <div className="page-content">
      <section className="metrics-section">
        <div className="metrics-header">
          <div className="metrics-title-block">
            <div className="metrics-title">
              Core Performance Metrics
              <span className="info-badge" title="These values update the public landing page">
                <Info size={12} />
              </span>
            </div>
            <p className="metrics-subtitle">
              Update the global statistics shown on the corporate public landing page.
            </p>
          </div>
       
        </div>

        <div className="metrics-grid">
          {INITIAL_METRICS.map(card => (
            <MetricCard
              key={card.id}
              card={card}
              editValues={editValues}
              editingId={editingId}
              onEditToggle={onEditToggle}
              onValueChange={handleValueChange}
            />
          ))}
        </div>

        <div className="metrics-footer">
          <div className="cache-notice">
            <Info size={13} />
            Changes will be reflected on the live site after cache clearance (approx. 5 mins).
          </div>
          <div className="footer-btns">
            <button className="btn btn--secondary" onClick={handleCancel} disabled={isSaving}>
              Cancel Changes
            </button>
            <button
              className={`btn btn--primary ${isSaving ? 'btn--loading' : ''}`}
              onClick={onSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <><span className="spinner" /> Saving…</>
              ) : (
                <><Save size={15} /> Save Changes</>
              )}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SiteContentPage;
