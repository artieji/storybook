import { IPage } from '@/types';
import s from './style.module.scss';
import { forwardRef } from 'react';

export const BookPage = forwardRef<HTMLDivElement, IPage>(({ order, imageSrc, pageContent, pageTitle }, ref) => {
	return (
		<div className={s.page} ref={ref} data-order={order}>
			<div className={s.inner_wrapper}>
				{/* <div className={s.pageCoverInside}/> */}
				<img className={s.pageBackgroundImage} src={order % 2 === 0 ? '/book_page_right.png' : '/book_page_left.png'} />
				<h3 className={s.title}>{pageTitle}</h3>
				<div className={s.image_wrapper}>
					<img className={s.image} src={imageSrc} alt='plug' />
				</div>
				<p className={s.content}>{pageContent}</p>
				<div className={s.footer}>
					<img className={s.order_img} src='/page_order_bg.png' />
					<div className={s.order_number}>{order}</div>
				</div>
			</div>
		</div>
	);
});
