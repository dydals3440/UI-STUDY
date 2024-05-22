import { useState } from 'react';
import cx from './cx';
import data from '../tooltip/data';

{
	/* <div>
	<tabList>
		<tab>....</tab>
		<tab>....</tab>
		<tab>....</tab>
		<tab>....</tab>
	</tabList>
	<description>...</description>
	<description>...</description>
	<description>...</description>
	<description>...</description>
</div> */
}

{
	/* <ul>
	<item>
		<tab></tab>
		<description></description>
	</item>
	<item>
		<tab></tab>
		<description></description>
	</item>
	<item>
		<tab></tab>
		<description></description>
	</item>
</ul> */
}

const TabItem = ({
	id,
	title,
	current,
	toggle,
}: {
	id: string;
	title: string;
	current: boolean;
	toggle: () => void;
}) => {
	return (
		<li className={cx('tab', { current })} key={id} onClick={toggle}>
			{title}
		</li>
	);
};

const TabMenu1 = () => {
	const [currentId, setCurrentId] = useState<string | null>(data[0].id);

	const toggleItem = (id: string) => () => {
		setCurrentId((prev) => (prev === id ? null : id));
	};
	const currentData = data.find((item) => item.id === currentId)?.description;
	return (
		<>
			<h3>
				#1. React<sub>현재 desc만 html로 그리기</sub>
			</h3>
			<div className={cx('container')}>
				<ul className={cx('tabList')}>
					{data.map((d) => (
						<TabItem
							{...d}
							key={d.id}
							current={currentId === d.id}
							toggle={toggleItem(d.id)}
						/>
					))}
				</ul>
				<div className={cx('description')}>{currentData || ''}</div>
			</div>
		</>
	);
};

export default TabMenu1;
