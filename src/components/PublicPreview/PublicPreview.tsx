import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import './PublicPreview.scss';

const PublicPreview: React.FC = () => (
	<div className="preview-card">
		<div className="preview-icon-wrap">
			<TrendingUp size={28} />
		</div>
		<h3 className="preview-title">Public View Preview</h3>
		<p className="preview-desc">
			Wondering how these metrics look to your clients? Preview the site's 'Impact' section in a new tab.
		</p>
		<span className="preview-link">
			View Public Preview <ArrowRight size={14} />
		</span>
	</div>
);

export default PublicPreview;

