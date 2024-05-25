import { useEffect, useRef } from 'react';
import cx from './cx';

const TextBox3 = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const cloneRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const elem = textareaRef.current;
		const cloneElem = cloneRef.current!;
		const handleInput = () => {
			if (!elem || !cloneRef) return;
			const val = elem.value;
			// 클론한것에 value를 넣어줌.
			cloneElem.value = val;
			elem.rows = Math.min(
				// 최소 3줄 최대 15줄
				// clone을 한줄로 강제했고, 패딩 탑 바텀을 다 없앰, 똑같이 일치시켜놈.
				// 전체 높이 / 클라이언트 높이 => 줄수가 나옴.
				Math.max(Math.ceil(cloneElem.scrollHeight / cloneElem.clientHeight), 3),
				15
			);
		};

		if (elem) elem.addEventListener('input', handleInput);

		return () => {
			if (elem) elem.removeEventListener('input', handleInput);
		};
	}, []);

	return (
		<>
			<h3>
				#3<sub>uncontrolled. clone elem</sub>
			</h3>
			<div className={cx('container')}>
				<textarea className={cx('clone')} rows={1} ref={cloneRef} readOnly />
				<textarea className={cx('textarea')} rows={3} ref={textareaRef} />
			</div>
		</>
	);
};

export default TextBox3;
