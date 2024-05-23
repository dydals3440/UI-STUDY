import {
	ReactNode,
	useSyncExternalStore,
	createContext,
	useContext,
} from 'react';

// document.body.getBoundingClientRect()를 콘솔에 치면, DOMRect 반환
type Rect = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'> & {
	scrollHeight: number;
};

const DefaultRect: Rect = {
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	scrollHeight: 0,
};

const rectKeys: (keyof Rect)[] = [
	'scrollHeight',
	'left',
	'top',
	'width',
	'height',
];

const isSameRect = (prev: Rect, next: Rect) => {
	return rectKeys.every((k) => prev?.[k] === next?.[k]);
};

// 스크롤링 엘리먼트에 대해서, 화면전체에 대해 바운딩 렉트값을 읽어다가, 반환하는 작업을함.
const getViewportRect = () => {
	let stored: Rect = DefaultRect;
	return () => {
		// SSR 처리 useSyncExternalStore
		const elem = typeof document !== 'undefined' && document.scrollingElement;
		if (!elem) return stored;
		const { left, top, width, height } = elem.getBoundingClientRect();
		const newRect = {
			left,
			top,
			width,
			height,
			scrollHeight: elem.scrollHeight,
		};
		if (newRect && !isSameRect(stored, newRect)) stored = newRect;
		return stored;
	};
};
// 13:00
const subscribe = (callback: () => void) => {
	// 요소의 크기 변화를 감지
	// Window.addEventListener의 'resize' 와는 다름.
	const resizeObserver = new ResizeObserver(callback);
	window.addEventListener('scroll', callback);
	resizeObserver.observe(document.body);
	return () => {
		window.removeEventListener('scroll', callback);
		resizeObserver.disconnect();
	};
};

const ViewportContext = createContext<Rect>(DefaultRect);

// useSyncExternalStore를 안전하게 사용하는 방법.
const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
	// 서버사이드에서 어떻게 동작할것인지 도 필요함. 생각이.
	const viewportRect = useSyncExternalStore(subscribe, getViewportRect());
	return (
		<ViewportContext.Provider value={viewportRect}>
			{children}
		</ViewportContext.Provider>
	);
};

export default ViewportContextProvider;

export const useViewPortRect = () => useContext(ViewportContext);
