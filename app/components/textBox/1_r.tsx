import { SyntheticEvent, useState } from 'react';
import cx from './cx';
import { measureLines } from '../../service/utils';

const TextBox1 = () => {
	const [text, setText] = useState('');
	const [lines, setLines] = useState(3);

	const handleChange = (e: SyntheticEvent) => {
		const elem = e.target as HTMLTextAreaElement;
		const val = elem.value;
		// 줄바꿈 체크 (몇 줄인지 체크 할 수 있음.)
		// 최소값으로 3보다는 더 작아지지 않게 안전장치 설정.
		// 최소 3줄 <-> 최대 15줄
		// const lines = Math.min(Math.max(val.split('\n').length, 3), 15);

		// canvas 반식
		const lines = Math.min(Math.max(measureLines(elem, val), 3), 15);
		console.log(lines);

		console.log(val);
		setText(val);
		setLines(lines);
	};

	return (
		<>
			<h3>
				#1<sub>controlled. canvas</sub>
			</h3>
			<div className={cx('container')}>
				{/* resize none이라, 사이즈를 조절할 수 없는 textarea임, 스크롤이 늘어남. */}
				<textarea
					className={cx('textarea')}
					onChange={handleChange}
					rows={lines}
				/>
			</div>
		</>
	);
};

export default TextBox1;
