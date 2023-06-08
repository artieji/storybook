import useResizeObserver from 'use-resize-observer';
import { useState, useMemo, useCallback } from 'react';
import { Draft, produce } from 'immer';
import { SizeSwitchConfig, SizeSwitchResult } from '@/types';

interface Size {
	width: number | undefined;
	height: number | undefined;
}

const getValue = ({ minWidth, maxWidth, minHeight, maxHeight }: SizeSwitchConfig, { width, height }: Size) => {
	if (minWidth !== undefined || maxWidth !== undefined) {
		if (width === undefined) return false;
		return (minWidth === undefined || width >= minWidth) && (maxWidth === undefined || width <= maxWidth);
	}
	if (minHeight !== undefined || maxHeight !== undefined) {
		if (height === undefined) return false;
		return (minHeight === undefined || height >= minHeight) && (maxHeight === undefined || height <= maxHeight);
	}
	return false;
};

const updateView = <T extends Record<string, SizeSwitchConfig>>(
	draft: Draft<Record<keyof T, boolean>>,
	size: Size,
	configs: T
) => {
	Object.entries(configs).forEach(([k, config]: [string, SizeSwitchConfig]) => {
		(draft as Draft<Record<string, boolean>>)[k] = getValue(config, size);
	});
	return draft;
};

export const useResize = <T extends Record<string, SizeSwitchConfig>>(configs: T): SizeSwitchResult<T> => {
	const [view, setView] = useState<Record<keyof T, boolean> | undefined>();

	const [refObj, setRefObj] = useState<HTMLElement | null>(null);

	const onResize = useCallback((size: Size) => {
		setView(produce(view, (draft: any): any => updateView(draft ?? ({} as Draft<Record<keyof T, boolean>>), size, configs)));
	}, []);
	useResizeObserver({
		ref: refObj,
		onResize,
	});
	const isReady = refObj !== null && view !== undefined;
	const ref = useCallback((el: HTMLElement): void => {
		if (el) {
			setRefObj(el);
			setView(
				produce(view, (draft: any): any =>
					updateView(draft ?? ({} as Draft<Record<keyof T, boolean>>), el.getBoundingClientRect(), configs)
				)
			);
		}
	}, []);
	return useMemo(
		() => ({
			isReady,
			view,
			ref,
		}),
		[isReady, view, ref]
	);
};
