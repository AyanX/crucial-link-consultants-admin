import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Toast } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastContextValue {
	addToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((message: string, type: 'success' | 'error') => {
		const id = Math.random().toString(36).slice(2);
		setToasts(prev => [...prev, { id, message, type }]);
		setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
	}, []);

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div className="toast-container">
				{toasts.map(t => (
					<div key={t.id} className={`toast toast--${t.type}`}>
						{t.type === 'success'
							? <CheckCircle size={16} />
							: <XCircle size={16} />}
						{t.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};
