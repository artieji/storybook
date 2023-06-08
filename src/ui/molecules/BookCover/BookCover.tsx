import { PageNavButton } from '../../atoms';
import s from './style.module.scss';
import { forwardRef, memo, useContext } from 'react';
import cn from 'classnames';
import { ResizeContext } from '@/contexts';

interface IProps {
	currentPage: number;
}

const BookCoverMemoless = forwardRef<HTMLDivElement, IProps>(({ currentPage }, ref) => {
	const view = useContext(ResizeContext);
	console.log(view);

	return (
		<div className={s.cover} ref={ref}>
			{currentPage === 0 && (
				<div className={s.buttonsWrapper}>
					<button className={cn(s.targetButton, { [s.xs]: view?.xs })}>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle opacity="0.9" cx="7" cy="7" r="6" stroke="#FAECD1" strokeWidth="2" />
						</svg>
					</button>
					<PageNavButton className={cn(s.tumblerButton, { [s.xs]: view?.xs })} />
				</div>
			)}
		</div>
	);
});

export const BookCover = memo(BookCoverMemoless);