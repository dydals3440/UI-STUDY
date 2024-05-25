import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

const CLAMP_LINES = 3;

const LineClampedText = ({ text, lines }: { text: string; lines: number }) => {
	const cloneRef = useRef<HTMLDivElement>(null);
	const elemRef = useRef<HTMLDivElement>(null);
	const [isClamped, toggleClamped] = useState(false);

	useEffect(() => {
		if (elemRef.current && cloneRef.current) {
			toggleClamped(
				Math.floor(
					cloneRef.current?.offsetHeight /
						// CSSOM DOM위에 오브젝트 모델이 붙음, CSS도 해당 오브젝트 모델이있음.
						// 스타일을 그대로 읽어와서 텍스트로 반환 parseInt해주면됨.
						// getComputedStyle(elemRef.current).lineHeight => 26.72px
						// parseInt => 26
						parseInt(getComputedStyle(elemRef.current).lineHeight)
				) > (lines || 0)
			);
		}
	}, [lines]);

	return (
		<div className={cx('content', { clamped: isClamped })}>
			{/* 스타일을 일치시키면 이 친구의 높이 값을 알 수 있음.
            텍스트가 들어가 있을 떄 줄바꿈이 되면서  그떄의 높이가 얼마인지 측정이 댐.
            cloneRef에 있는 offset height 같은 것으로 이것으로 line height가 똑같다고 하면, 맞아떨어지는 계산이 나옴. */}
			<div className={cx('text-clone')} ref={cloneRef}>
				{text}
			</div>
			<div
				className={cx('text')}
				ref={elemRef}
				style={{ WebkitLineClamp: lines }}
			>
				{text}
			</div>
			{isClamped && (
				<button
					className={cx('buttonMore')}
					onClick={() => toggleClamped(false)}
				/>
			)}
			{!isClamped && (
				<button
					className={cx('buttonLess')}
					onClick={() => toggleClamped(true)}
				/>
			)}
		</div>
	);
};

const LineClamp2 = () => {
	return (
		<>
			<h3>
				#2<sub>clone - 3줄말줄임</sub>
			</h3>
			{data.map((text, i) => (
				<LineClampedText text={text} lines={5 - i} key={i} />
			))}
		</>
	);
};

export default LineClamp2;
