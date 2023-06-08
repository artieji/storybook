import { IPage } from "@/types";
import { getSizeByView, workWithClass } from "@/utils";
import { useContext, useEffect, useRef, useState } from "react";
import FlipBook from 'react-pageflip';
import s from './style.module.scss';
import cn from 'classnames';
import { ResizeContext } from "@/contexts";
import { PageNavButton } from "@/ui/atoms";
import { BookCover, BookPage } from "@/ui/molecules";

const pagesData: IPage[] = [
	{ order: 1, imageSrc: '/book_page_content_image_1.jpg', pageTitle: 'История создания', pageContent: 'Эта история берет свое начало в послевоенное время, когда мир пытался справиться с последствиями разрухи.' },
	{ order: 2, imageSrc: '/book_page_content_image_2.jpg', pageTitle: '', pageContent: 'Собрав на последние средства нашего селения экспедицию, мы отправились к берегам Южной Америки,  на последние средства нашего селения экспедицию, мы отправились к берегам Южной Америки, где за легендами...' },
	{ order: 3, imageSrc: '/book_page_content_image_3.jpg', pageTitle: '', pageContent: 'Собрав на последние средства нашего селения экспедицию, мы отправились к берегам Южной Америки, где за легендами...' },
	{ order: 4, imageSrc: '/book_page_content_image_4.jpg', pageTitle: '', pageContent: 'Но нашим мечтам было не суждено сбыться. Судно попало в сильный шторм и было полностью разрушено, а мы вынесены волнами на необитаемый остров.' },
	{ order: 5, imageSrc: '/book_page_content_image_5.jpg', pageTitle: '', pageContent: '7 долгих дней блужданий по острову обессилили нас. Лишь смелость сердец и вера в удачу вела вперед.' },
	{ order: 6, imageSrc: '/book_page_content_image_6.jpg', pageTitle: '', pageContent: 'В тот день, когда отчаяние начало брать верх, впереди замаячил свет костра в непроходимых джунглях. Это казалось чудом. Им оно и было. ' },
	{ order: 7, imageSrc: '/book_page_content_image_7.jpg', pageTitle: '', pageContent: 'В тот день, когда отчаяние начало брать верх, впереди замаячил свет костра в непроходимых джунглях. Это казалось чудом. Им оно и было.' },
	{ order: 8, imageSrc: '/book_page_content_image_8.jpg', pageTitle: '', pageContent: 'У костра сидела девушка, красота которой затмевала лунный свет и заставляла сердце биться чаще.' },
];

export const Book = () => {
	const view = useContext(ResizeContext);
	const [eventPageData, setEventPageData] = useState<any>({});
	const [currentPage, setCurrentPage] = useState<number>(0);
	const bookRef = useRef<any>(null);
	const bookContainerRef = useRef<HTMLDivElement | null>(null);
	const [mount, setMount] = useState({ count: 0, classBeenApplied: false });

	useEffect(() => {
		if (mount.classBeenApplied) return;
		setMount(prev => ({ count: prev.count + 1, classBeenApplied: prev.classBeenApplied }));
		const regex = /(^|\s)moveToLeft(\S+|$)/;

		if (regex.test((document.querySelector('.stf__parent') as HTMLElement).className)) {
			setMount(prev => ({ count: prev.count, classBeenApplied: true }))
		}
	}, [])
	useEffect(() => {
		const bookEvent = eventPageData?.data;

		if (!bookRef.current || bookEvent !== 'flipping') return;
		let timeoutId: string | number | NodeJS.Timeout | undefined;
		const bookNode = eventPageData?.object?.block;
		const book = bookRef.current.pageFlip();
		const leftPage = book.getRender().leftPage?.element;
		const rightPage = book.getRender().rightPage?.element;
		const coverReg = /(^|\s)_cover_(\S+|$)/;
		if (bookEvent === 'flipping' && coverReg.test(rightPage.className)) {

			workWithClass(bookNode, s.moveToLeft, false)
			timeoutId = setTimeout(() => {
				if (!bookNode.classList.contains(s.background_inside)) {
					console.log('TESTSTSTS');

					workWithClass(bookNode, s.background_inside, true);
				}
			}, 300);
		}
		const simpleReg = /--soft/;
		if (bookEvent === 'flipping' && leftPage?.dataset.order == '1' && !simpleReg.test(leftPage.className)) {
			workWithClass(bookNode, s.moveToLeft, true);
			if (bookNode.classList.contains(s.background_inside)) {
				workWithClass(bookNode, s.background_inside, false);
			}
		}

		return () => {
			clearTimeout(timeoutId);
		}
	}, [eventPageData, bookRef])

	return (
		<>
			<div ref={bookContainerRef} className={cn(s.bookContainer, { [s.onePage]: view?.m })}>
				<FlipBook
					ref={bookRef}
					className={cn('stf__parent', { [s.book]: view?.l, [s.moveToLeft]: mount.count <= 3 && !mount.classBeenApplied && view?.l })}
					width={getSizeByView({ view })}
					maxWidth={getSizeByView({ view })}
					minWidth={getSizeByView({ view, minV: true })}
					height={getSizeByView({ view, width: false })}
					maxHeight={getSizeByView({ view, width: false })}
					minHeight={getSizeByView({ view, width: false, minV: true })}
					showCover
					mobileScrollSupport={true}
					drawShadow={false}
					size={view?.l ? 'stretch' : 'fixed'}
					flippingTime={400}
					onChangeState={(e) => {
						setEventPageData(e);
					}}
					onFlip={(e) => {
						setCurrentPage(e?.object?.pages?.currentPageIndex);
					}}
					startPage={0}
					style={{}}
					usePortrait={true}
					autoSize={true}
					clickEventForward={false}
					startZIndex={0}
					maxShadowOpacity={0}
					useMouseEvents={true}
					swipeDistance={0}
					disableFlipByClick={false}
					showPageCorners={true}
				>
					<BookCover currentPage={currentPage} />
					{pagesData.map((page) => {
						return <BookPage order={page.order} imageSrc={page.imageSrc} key={page.order} pageContent={page.pageContent} pageTitle={page.pageTitle} />
					})}
				</FlipBook>
			</div>
			{currentPage !== 0 && (

				<div className={s.buttonsWrapper}>
					<PageNavButton onClick={() => {
						if (!bookRef.current) return;

						bookRef.current.pageFlip().flipPrev();
					}} />
					<PageNavButton color='orange' onClick={() => {
						if (!bookRef.current) return;

						bookRef.current.pageFlip().flipNext();
					}} />
				</div>
			)}
		</>
	)
}