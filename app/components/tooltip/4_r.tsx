import { useRef } from 'react';
import ViewportContextProvider from '../../context/viewportContext';
import cx from './cx';
import data from './data';
import useStyleInView from './useStyleInView';

const tooltipPosition = {
	top: '100%',
	bottom: 20,
	left: 0,
	right: 0,
};
const Tooltip = ({
	id,
	title,
	description,
}: {
	id: string;
	title: string;
	description: string;
}) => {
	const wrapperRef = useRef<HTMLDetailsElement>(null);
	const targetRef = useRef<HTMLDivElement>(null);
	// {}는 컴포넌트가 업로드 될 때마다 렌더링 이슈 발생.
	// Maximum update depth exceeded 렌더링할떄마다 {}이게 새로 만들어지니까.
	// {}가 렌더링 할 떄 마다 새로만들어지니까, 바끼ㅜㄴ걸로 인식해서 useLayoutEffect가 자꾸 호출됨.
	// {} 이 부분을 밖으로 뺴주어야함. => 안티패턴
	// 	const style = useStyleInView(wrapperRef, targetRef, {});
	const style = useStyleInView(wrapperRef, targetRef, tooltipPosition);

	return (
		<details className={cx('details')} data-tooltip={id} ref={wrapperRef}>
			<summary className={cx('summary')} data-tooltip-summary>
				{title}
			</summary>
			<div
				className={cx('tooltip')}
				onClick={(e) => e.stopPropagation()}
				ref={targetRef}
				style={style}
			>
				{description}
			</div>
		</details>
	);
};

const Tooltip4 = () => {
	return (
		<ViewportContextProvider>
			<>
				<h3>
					#4 <sub></sub>
					{data.map((d) => (
						<Tooltip {...d} key={d.id} />
					))}
				</h3>
			</>
		</ViewportContextProvider>
	);
};

export default Tooltip4;
