import { SyntheticEvent, useEffect } from 'react';
import cx from './cx';
import data from './data';
import SingleOpenContextProvider, {
	useSingleOpen,
} from '../../context/singleOpenContext';

const Tooltip = ({
	id,
	title,
	description,
}: {
	id: string;
	title: string;
	description: string;
}) => {
	const [isOpen, toggle] = useSingleOpen(id);

	const handleClick = (e: SyntheticEvent) => {
		// 밖에서 다른데 클릭했을 떄, 토글하는 것을 걸어주기 위해서
		e.stopPropagation();
		toggle((p) => (p === id ? null : id));
	};

	// useEffect(() => {
	// 	if (isOpen) {
	// 		window.addEventListener('click', () => toggle(false));
	// 	}
	// }, [isOpen]);

	// 보통 useEffect를 사용하면 cleanup을 해주어야 한다.
	useEffect(() => {
		const close = () => toggle(null);
		if (isOpen) {
			// open이 되있을떄 한번ㄴ만 쓸꺼기 때문에
			// once: true 선언하면, cleanup안해도됨
			window.addEventListener('click', close, { once: true });
		}

		return () => {
			window.removeEventListener('click', close);
		};
	}, [isOpen, toggle]);

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

const Tooltip2 = () => {
	return (
		<>
			{/* 툴팁이 뜨는 위치가 화면에서 여러군데 있음 */}
			{/* 그런데서 상태를 관리한다고 할 떄 전체를 감싸고 있는 바깥에 props를 바깥에 있는 컨테이너, 래퍼 개념에서 감싸놓고, 거기서 스테이트를 만든 다음에, props-drilling을 하는 것보다. */}
			{/* 만약에 느낌표가, 되게 여러군데에있다면, 전체를 감싸고 있는 툴팁에대한 거를 관리하는 컨텍스트를 하나만 두고, 필요할 떄만 훅으로 가져다 쓰는게 더 나을 수 있음. */}
			<h3>
				#2. React <sub>하나만 열리도록</sub>{' '}
			</h3>
			<SingleOpenContextProvider>
				{data.map((d) => (
					<Tooltip {...d} key={d.id} />
				))}
			</SingleOpenContextProvider>
		</>
	);
};

export default Tooltip2;
