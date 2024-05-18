import { useState } from 'react';
import cx from './cx';
import data from './data';

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

const TabMenu3 = () => {
	const [currentId, setCurrentId] = useState<string | null>(data[0].id);

	const toggleItem = (id: string) => () => {
		setCurrentId((prev) => (prev === id ? null : id));
	};

	return (
		<>
			<h3>
				#3. React<sub>한 li 안에 title/desc 모두 있게 처리</sub>
			</h3>
			<div className={cx('container', 'tabMenu2')}>
				{data.map((d) => (
					<TabItem
						{...d}
						key={d.id}
						current={currentId === d.id}
						toggle={toggleItem(d.id)}
					/>
				))}
			</div>
		</>
	);
};

export default TabMenu3;
