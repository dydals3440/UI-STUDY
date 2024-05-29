import VanillaWrapper from '../vanillaWrapper';
import cx from './cx';
import data from './data';

const clampedElemBuilder = (
	text: string,
	lines: number,
	wrapper: HTMLDivElement
) => {
	let isClamped = true;

	const toggleClamped = (e: Event | null, force?: boolean) => {
		isClamped = typeof force === 'boolean' ? force : !isClamped;
		$content.classList.toggle(cx('clamped'), isClamped);
		if (isClamped) $content.append($btn);
		else $btn.remove();
	};

	const $clone = document.createElement('div');
	$clone.classList.add(cx('text-clone'));
	$clone.textContent = text;

	const $text = document.createElement('div');
	$text.classList.add(cx('text'));
	$text.textContent = text;
	// 줄수가 넘어오면 그 줄수를 문자열로 변경
	$text.style.webkitLineClamp = lines + '';

	const $btn = document.createElement('button');
	$btn.classList.add(cx('buttonMore'));
	// 한번만 하면 될 떄 once: true
	$btn.addEventListener('click', toggleClamped, { once: true });

	const $content = document.createElement('div');
	$content.classList.add(cx('content'));
	$content.append($clone, $text);

	// mutationObserver : ResizeObserver,IntersectionObserver,MutationObserver
	// MutationObserver 뮤테이션이 일어날떄 HTML 엘리먼트에 감시를 시켜놓고 개한테 뮤테이션이 있을떄 콜백을 호출하도록 하는 녀석.

	// useEffect를 한번 호출하는거랑 같은 역할
	const handleMutate = () => {
		const lineHeight = parseInt(getComputedStyle($text).lineHeight);
		const measuredLines = Math.floor($clone.offsetHeight / lineHeight);
		// m>3이 넘을때 강제로 true로 만들어라.
		toggleClamped(null, measuredLines > lines);
	};

	const observer = new MutationObserver(() => {
		if (wrapper.contains($content)) {
			handleMutate();
			observer.disconnect();
		}
	});
	observer.observe(wrapper, {
		childList: true,
		// 다큐먼트 하위에 있는 모든  childList감시, 단 이게 성능상으로 우려가댐.
		subtree: true,
	});
	return $content;
};

const initiator = (wrapper: HTMLDivElement) => {
	const $elems = data.map((text, i) =>
		clampedElemBuilder(text, 5 - i, wrapper)
	);
	wrapper.append(...$elems);
};

const LineClamp3_V = () => <VanillaWrapper title='#3' initiator={initiator} />;
export default LineClamp3_V;
