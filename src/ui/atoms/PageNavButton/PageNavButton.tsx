import { buttons } from '@/assets/styles/modules';
import cn from 'classnames';

interface IProps {
	color?: 'white' | 'orange';
	className?: string;
	onClick?: () => void;
}

export const PageNavButton = ({ color = 'white', className, onClick }: IProps) => {
	return (
		<button className={cn(color === 'white' ? buttons.navButtonLeftWhite : buttons.navButtonRightOrange, className)} onClick={onClick}>
			<div>
				<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.66699 14.6667L1.00033 8.00008L7.66699 1.33342" stroke="#392602" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</button>
	)
}