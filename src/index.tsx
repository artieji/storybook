import React from 'react'
import ReactDOM from 'react-dom/client'
import { Pages } from '@/ui/pages';
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Pages.Root />
	</React.StrictMode>,
)
