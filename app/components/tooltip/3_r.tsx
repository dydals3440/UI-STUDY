import { SyntheticEvent, useEffect } from 'react';
import cx from './cx';
import data from './data';
import { useSingleOpen } from './singleOpenContext';

const Tooltip = ({
	id,
	title,
	description,
}: {
	id: string;
	title: string;
	description: string;
}) => {
	// useEffect(() => {
	// 	const close = () => toggle(null);
	// 	if (isOpen) {
	// 		window.addEventListener('click', close, { once: true });
	// 	}

	// 	return () => {
	// 		window.removeEventListener('click', close);
	// 	};
	// }, [isOpen, toggle]);

	return (
		<details className={cx('details')} data-tooltip={id}>
			<summary className={cx('summary')} data-tooltip-summary>
				{title}
			</summary>

			<div className={cx('tooltip')} onClick={(e) => e.stopPropagation()}>
				{description}
			</div>
		</details>
	);
};

const Tooltip3 = () => {
	useEffect(() => {
		// html -> event react -> SyntheticEvent
		const closeAllToolTip = (e: Event) => {
			const target = e.target as HTMLElement;
			// tooltipSummary(dataSet안에서는 camelCase로 들어감)
			// 클릭한 대상이 summary에 해당하는지 체크 (맞으면 서머리열고, 아니면 다 닫음)
			// 정확히 타게팅 위해 data-tooltip을 줌
			const isSummary = !!target.dataset.tooltipSummary;
			document.querySelectorAll('[data-tooltip]').forEach((elem) => {
				if (elem !== target.parentElement) elem.removeAttribute('open');
			});
		};
		// window를 클릭했을떄 클릭 이벤트가 버블링이 일어남.
		// window 하위에 있는 어디서 클릭하든, 다 이벤트 핸들러에 걸리게됨.
		// 그 중에서 details 하위에 있는 것을 클릭할 때에 대해서, 그런것만 걸러서 처리하기 위해 위에서 함.
		// 실행시 타겟을 찾아다가, 타겟이 툴팁에 있는 summary , 툴팁에 해당되냐를 봄.
		// 툴팁 전부에 대해서 어트리뷰트를 지움. 근데 예외사항이 있다면 summary이거나,  summary를 클릭했을 떄는
		// 예외, 혹은 parentElement가 현재 내가 클릭한 대상이거나, 클릭한 대상의 parent가 이 데이터 툴팁에 해당하거나, 이 서머리를 클릭했을 때 애가 지금 클릭한 대상이 아닌 다른애들것을 다 지워줘야 한다.
		window.addEventListener('click', closeAllToolTip);
		return () => {
			window.removeEventListener('click', closeAllToolTip);
		};
	}, []);
	return (
		<>
			<h3>
				#3. React <sub>html details 태그 사용</sub>
			</h3>
			{data.map((d) => (
				<Tooltip {...d} key={d.id} />
			))}
		</>
	);
};

export default Tooltip3;
