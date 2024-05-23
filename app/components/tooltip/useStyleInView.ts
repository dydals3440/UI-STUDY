import { RefObject, useLayoutEffect, useState } from 'react';
import { useViewPortRect } from '../../context/viewportContext';

type PositionKey = 'left' | 'right' | 'top' | 'bottom';
// left : string | number
type Position = Partial<Record<PositionKey, string | number>>;
type Style = Partial<Record<'left' | 'right' | 'top' | 'bottom', number>>;

const useStyleInView = (
	wrapperRef: RefObject<HTMLElement>,
	targetRef: RefObject<HTMLElement>,
	position: Position
) => {
	const viewportRect = useViewPortRect();
	const [style, setStyle] = useState<Style>({});

	useLayoutEffect(() => {
		if (!wrapperRef.current || !targetRef.current) return;
		const wrapperRect = wrapperRef.current.getBoundingClientRect();
		const targetRect = targetRef.current.getBoundingClientRect();
		const verticalKey =
			wrapperRect.bottom + targetRect.height < viewportRect.height
				? 'top'
				: 'bottom';
		const horizontalKey =
			wrapperRect.right + targetRect.width < viewportRect.width
				? 'left'
				: 'right';
		setStyle({
			// [verticalKey]: verticalKey === 'top' ? '100%' : 20,
			[verticalKey]: position[verticalKey] || 0,
			[verticalKey === 'top' ? 'bottom' : 'top']: 'auto',
			[horizontalKey]: position[horizontalKey] || 0,
			[horizontalKey === 'left' ? 'right' : 'left']: 'auto',
		});
	}, [viewportRect, wrapperRef, targetRef, position]);

	return style;
};

export default useStyleInView;
