// Relative build date calculation (client-side)
	export function getRelativeDate(date: Date) {
		const now = new Date();
		// Zero out time for accurate day comparison
		const d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		const d2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const diffMs = d1.getTime() - d2.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		if (diffDays === 1) return 'yesterday';
		if (diffDays >= 2 && diffDays <= 6) return `${diffDays} days ago`;
		if (diffDays >= 7 && diffDays <= 27) {
			const weeks = Math.round(diffDays / 7);
			return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
		}
		if (diffDays >= 28 && diffDays < 365) {
			const months = Math.round(diffDays / 30);
			return `${months} month${months > 1 ? 's' : ''} ago`;
		}
		if (diffDays >= 365 && diffDays < 730) return '1 year ago';
		return 'today';
	}