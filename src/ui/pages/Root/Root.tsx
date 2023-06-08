import s from './style.module.scss';
import { useMemo } from "react";
import cn from 'classnames';
import { useResize } from "@/hooks";
import { ResizeContext } from "@/contexts";
import { Book } from "@/ui/organisms";



export const Root = () => {
	const { ref: resizeRef, view } = useResize({
		l: { minWidth: 641 },
		m: { maxWidth: 640, minWidth: 413 },
		s: { minWidth: 361, maxWidth: 412 },
		xs: { maxWidth: 360 }
	});

	return (
		<ResizeContext.Provider value={useMemo(() => view, [view])}>
			<div ref={resizeRef} className={cn(s.resizeWrapper)}>
				<Book />
			</div>
		</ResizeContext.Provider>
	);
};
