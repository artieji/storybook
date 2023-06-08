import { RefCallback } from 'react';
export interface SizeSwitchResult<T> {
	isReady: boolean;
	view: Record<keyof T, boolean> | undefined;
	ref: RefCallback<HTMLElement>;
}

export interface SizeSwitchConfig {
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
}