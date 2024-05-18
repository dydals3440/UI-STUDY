import { useState } from 'react';
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
	return (
		<li key={id} className={cx('item', 'item3', { current })}>
			<div className={cx('tab')} onClick={toggle}>
				{title}
			</div>
			{/* current만 들어갈떄만 아래를 보여주자. css */}
			<div className={cx('description')}>{description}</div>
		</li>
	);
};

const Accordion3 = () => {
	const [currentId, setCurrentId] = useState<string | null>(data[0].id);
	const toggleItem = (id: string) => () => {
		setCurrentId((prev) => (prev === id ? null : id));
	};

	return (
		<>
			<h3>
				#3. React <sub>css animation (transition)</sub>
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

export default Accordion3;
