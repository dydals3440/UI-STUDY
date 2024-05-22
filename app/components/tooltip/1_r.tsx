import { SyntheticEvent, useEffect, useState } from 'react';
import cx from './cx';
import data from './data';

const Tooltip = ({
	id,
	title,
	description,
}: {
	id: string;
	title: string;
	description: string;
}) => {
	const [isOpen, toggle] = useState(false);

	const handleClick = (e: SyntheticEvent) => {
		// 밖에서 다른데 클릭했을 떄, 토글하는 것을 걸어주기 위해서
		e.stopPropagation();
		toggle((p) => !p);
	};

	// useEffect(() => {
	// 	if (isOpen) {
	// 		window.addEventListener('click', () => toggle(false));
	// 	}
	// }, [isOpen]);

	// 보통 useEffect를 사용하면 cleanup을 해주어야 한다.
	useEffect(() => {
		if (isOpen) {
			window.addEventListener('click', () => toggle(false));
		}
		return () => {
			window.removeEventListener('click', () => toggle(false));
		};
	}, [isOpen]);

	return (
		<div className={cx('container')}>
			{/* 버튼을 클릭할떄는 다른 것은 닫히지 않게 하고선 열려야 하기에 e.stopPropagation을 사용한다. */}
			<button className={cx('trigger')} onClick={handleClick}>
				{title}
			</button>
			{/* 설명서 부분도 클릭했을 떄, 닫히지 않고, 다른건 열리게 해야하기에 e.stopPropgation 사용 */}
			{isOpen && (
				<div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
					{description}
				</div>
			)}
		</div>
	);
};

const Tooltip1 = () => {
	return (
		<>
			<h3>#1. React</h3>
			{data.map((d) => (
				<Tooltip {...d} key={d.id} />
			))}
		</>
	);
};

export default Tooltip1;
