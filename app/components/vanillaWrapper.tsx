// JS 구문을 실행해주는 함수를 전달받아서 함수를 컴포넌트가 렌더링 된 다음에

import { useEffect, useRef } from 'react';

// 한번만 그 함수를 실행해주는 목적으로 wrapper를 만듬
const VanillaWrapper = ({
	initiator,
}: {
	initiator: (wrapper: HTMLDivElement) => void;
}) => {
	const wrapper = useRef<HTMLDivElement>(null);
	const isInit = useRef(false);

	useEffect(() => {
		if (!isInit.current && !!wrapper.current) {
			initiator(wrapper.current);
			isInit.current = true;
		}
	}, [initiator]);

	return <div ref={wrapper} />;
};

export default VanillaWrapper;
