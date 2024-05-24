import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import cx from './cx';
import { measureLines } from '../../service/utils';

const TextBox2 = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const elem = textareaRef.current;
		const handleInput = () => {
			if (!elem) return;
			const val = elem.value;
			const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
			elem.rows = lines;
		};
		if (elem) elem.addEventListener('input', handleInput);

		return () => {
			if (elem) elem.removeEventListener('input', handleInput);
		};
	}, []);

	return (
		<>
			<h3>
				#2<sub>uncontrolled. canvas</sub>
			</h3>
			<div className={cx('container')}>
				<textarea className={cx('textarea')} rows={3} ref={textareaRef} />
			</div>
		</>
	);
};

export default TextBox2;

// controlled => 리액트가 상태를 관리하고있음. (폼요소에 대해서 많이 씀 onChange에 대해서 리액트에 있는 이벤트 핸들러를 걸어서 React가 그 상태를 관리해서 여기에 있는 value에도 영향ㅇ을 주게끔)

// uncontrolled => 반대로, 폼 요소에 해당하는 textArea에 대해서 react가 일절 관여하지않음.
// 나머지 다른 부분에 자율적인 영역, 개발자의 역량에 맞춰서 처리를 하게끔 한다음에, react는 그 부분에관여하지 않겠다.
