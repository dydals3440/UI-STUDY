import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

const AccordionItem = ({
	id,
	title,
	description,
	current,
	toggle,
}: {
	id: string;
	title: string;
	description: string;
	current: boolean;
	toggle: () => void;
}) => {
	const descRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (descRef.current) {
			descRef.current.addEventListener('beforematch', toggle);
		}
		return () => {
			if (descRef.current)
				descRef.current.removeEventListener('beforematch', toggle);
		};
	}, [toggle]);

	return (
		<li key={id} className={cx('item', 'item3', { current })}>
			<div className={cx('tab')} onClick={toggle}>
				{title}
			</div>
			{/* current만 들어갈떄만 아래를 보여주자. css */}
			<div
				className={cx('description')}
				ref={descRef}
				// hidden이 소문자일 때 react에서 이 친구를 Until Found라는게 아직 반영이 안돼있어서 없애버리는 문제가 있어서, 이거를 대문자로 썼을 때 HTML에서 대소문자 구분을 안하기에 제대로 된 걸로 인식을 한다는 꼼수
				// onBeforeMatch={} 이런식으로 반영해줘야하는데 아직 React에서 애를 못반영해줌.
				HIDDEN={current ? undefined : 'until-found'}
			>
				{description}
			</div>
		</li>
	);
};

const Accordion6 = () => {
	const [currentId, setCurrentId] = useState<string | null>(data[0].id);
	const toggleItem = (id: string) => () => {
		setCurrentId((prev) => (prev === id ? null : id));
	};

	return (
		<>
			<h3>
				#6. React <sub>ctrl + F</sub>
			</h3>
			<ul className={cx('container')}>
				{data.map((d) => (
					<AccordionItem
						{...d}
						key={d.id}
						current={currentId === d.id}
						toggle={toggleItem(d.id)}
					/>
				))}
			</ul>
		</>
	);
};

export default Accordion6;
/* 참고: https://hiddenest.dev/accessible-accordion */
